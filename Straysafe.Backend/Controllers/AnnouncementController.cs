using Microsoft.AspNetCore.Mvc;
using Straysafe.Backend.Common.DAL.Models;
using Straysafe.Backend.Services.Repositories;

namespace Straysafe.Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AnnouncementController(IServiceProvider serviceProvider) : BaseController(serviceProvider)
    {
        [HttpPost("add")]
        public async Task<IActionResult> PostAnnouncement([FromBody] Announcement announcement)
        {
            announcement.Attachment = Guid.NewGuid().ToString();
            var okResult = await AnnouncementRepository.AddAsync(announcement);

            AddNotification(announcement.PostedBy, "Announcement", "posted an announcement");

            if (okResult) 
                return Ok(new
                {
                    Message = "Announcement was added",
                    Success = true,
                    announcement.Attachment
                });
            return BadRequest(new
            {
                Message = "Failed to add announcement",
                Success = false
            });
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteAnnouncement([FromQuery] Guid announcementId)
        {
            var okResult = await AnnouncementRepository.DeleteAsync(announcementId);

            if (okResult)
                return Ok(new
                {
                    Message = "Announcement was deleted",
                    Success = true
                });
            return BadRequest(new
            {
                Message = "Failed to delete announcement",
                Success = false
            });
        }

        [HttpPatch("Update")]
        public async Task<IActionResult> UpdateAnnouncement([FromBody] Announcement announcement)
        {
           var existingAnnouncement = await AnnouncementRepository.GetAsync(announcement.Id);
           if (existingAnnouncement == null) return NotFound(new { Message = "Cannot find an existing announcement to update", Success = false });

            if (!string.IsNullOrEmpty(announcement.Title))
                existingAnnouncement.Title = announcement.Title;
            if (!string.IsNullOrEmpty(announcement.Content))
                existingAnnouncement.Content = announcement.Content;
            if (!string.IsNullOrEmpty(announcement.Attachment))
                existingAnnouncement.Attachment = announcement.Attachment;


            AddNotification(announcement.PostedBy, "Announcement", "updated an announcement");

            bool result = await AnnouncementRepository.UpdateAsync(existingAnnouncement);
            if (!result) return BadRequest(new { Message = "Failed to Update announcement", Success = false });
            return Ok(new { Message = "Updated announcement", Success = true });
        }

        [HttpGet("getall")]
        public IActionResult GetAllAnnouncement()
        {
            return Ok(new { Message = "Announcements Retrieved", Data = AnnouncementRepository.GetAll().OrderByDescending(d => d.Date), Success = true });
        }

    }
}
