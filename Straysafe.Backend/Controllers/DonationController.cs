using Microsoft.AspNetCore.Mvc;
using Straysafe.Backend.Common.DAL.Models;
using Straysafe.Backend.Services.Repositories;

namespace Straysafe.Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DonationController(IServiceProvider serviceProvider) : BaseController(serviceProvider)
    {

        [HttpGet("getAll")]
        public IActionResult GetDonations()
        {
            return Ok(new { Message = "Retrieved Donation Data", Success = true, Data = DonationRepository.GetAll().OrderBy(d => d.IssueDate) });
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddDonation([FromBody] Donation donation)
        {
            var result = await DonationRepository.AddAsync(donation);

            var userData = await GetUser(donation.DonorId);
            if (userData != null)
            {
                AddNotification(donation.DonorId, "Donation", $"has donated P{donation.Amount}");
            }

            if(!result) return BadRequest(new { Message = "Failed to save donation", Success = false, donation.Id });
            return Ok(new { Message = "Saved Donation", Success = true, donation.Id });
        }

    }
}
