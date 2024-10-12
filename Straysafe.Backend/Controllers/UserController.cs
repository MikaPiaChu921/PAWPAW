using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Straysafe.Backend.Common.DAL.Models;
using Straysafe.Backend.Common.DTO;
using Straysafe.Backend.Common.DTO.Auth;
using Straysafe.Backend.Helper;
using Straysafe.Backend.Services.Repositories;

namespace Straysafe.Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController(ILogger<UserController> logger, IRepository<User> repository) : Controller
    {
        private readonly ILogger<UserController> _logger = logger;
        private readonly IRepository<User> _repository = repository;

        [HttpPost("Register")]
        public async Task<IActionResult> AddUser([FromBody] User user)
        {
            // Hash the password
            user.Password = Hasher.HashSHA512(user.Password);
            bool result = await _repository.AddAsync(user);

            if (result) return Ok(new { Message = "User has been Registered", Success = result});
            return BadRequest(new { Message = "Failed to Register User", Success = result });
        }

        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            var result = _repository.GetAll();

            return Ok(result);
        }

        [HttpGet("Get")]
        public async Task<IActionResult> Get([FromQuery] string Id)
        {
            bool parseStatus = Guid.TryParse(Id, out var userId);

            if (!parseStatus) return BadRequest(new { Message = "Failed to parse Id to GUID", Success = false });

            var result = await _repository.GetAsync(userId);

            if (result != null)
                return Ok(new { Message = "Found user", Success = true, Data = result.GetDTO() });
            return NotFound(new { Message = "No user found", Success = false });
        }

        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete(Guid Id)
        {
            var result = await _repository.DeleteAsync(Id);

            return Ok(new { Message = "Delete Action Triggered", Success = result });
        }

        [HttpPatch("Update")]
        public async Task<IActionResult> Update([FromBody] User updatedUser)
        {
            var user = _repository.GetAll().FirstOrDefault(u => u.Id == updatedUser.Id);

            if (user != null)
            {
                if(!string.IsNullOrEmpty(updatedUser.FirstName))
                    user.FirstName = updatedUser.FirstName;
                if (!string.IsNullOrEmpty(updatedUser.LastName))
                    user.LastName = updatedUser.LastName;
                if (!string.IsNullOrEmpty(updatedUser.Email))
                    user.Email = updatedUser.Email;
                if (!string.IsNullOrEmpty(updatedUser.Password))
                    user.Password = Hasher.HashSHA512(updatedUser.Password);
                if (!string.IsNullOrEmpty(updatedUser.ContactNumber))
                    user.ContactNumber = updatedUser.ContactNumber;
                if (!string.IsNullOrEmpty(updatedUser.Address))
                    user.Address = updatedUser.Address;
                // Role is onetime, cannot be changed
                user.Locked = updatedUser.Locked;

                bool result = await _repository.UpdateAsync(user);

               if(result)
                {
                    return Ok(new
                    {
                        Message = "User was updated successfully",
                        Data = new UserDTO
                        {
                            Id = user.Id,
                            FirstName = user.FirstName,
                            LastName = user.LastName,
                            Email = user.Email,
                            ContactNumber = user.ContactNumber,
                            Address = user.Address,
                            Role = user.Role,
                            Locked = user.Locked,
                        },
                        Success = result
                    });
                }

            }

            return BadRequest(new { Message = "Failed to update user", Success = false });
        }

        [HttpPost("Login")]
        public IActionResult Login([FromBody] UserCredential credential)
        {
            var user = _repository.GetAll().FirstOrDefault(u => 
            u.Email.ToLower().Equals(credential.Email.ToLower()) && u.Password.Equals(Hasher.HashSHA512(credential.Password)));

            
            if(user != null)
            {
                return Ok(new
                {
                    Message = "Logged In Successfully",
                    Data = new UserDTO
                    {
                        Id = user.Id,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Email = user.Email,
                        ContactNumber = user.ContactNumber,
                        Address = user.Address,
                        Role = user.Role,
                        Locked = user.Locked,
                    }
                });
            }
            
            return Unauthorized(new { Message = "Invalid Credentials", Data = false});
        }
    }
}
