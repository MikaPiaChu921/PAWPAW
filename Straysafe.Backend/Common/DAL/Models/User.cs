using Straysafe.Backend.Common.DTO;

namespace Straysafe.Backend.Common.DAL.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string ContactNumber { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public bool Locked { get; set; } = false;

        public UserDTO GetDTO()
        {
            return new UserDTO
            {
                Id = Id,
                FirstName = FirstName,
                LastName = LastName,
                Email = Email,
                ContactNumber = ContactNumber,
                Address = Address,
                Role = Role,
                Locked = Locked
            };
        }
    }
}
