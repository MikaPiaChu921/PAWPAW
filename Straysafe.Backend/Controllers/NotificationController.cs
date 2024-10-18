using Microsoft.AspNetCore.Mvc;
using Straysafe.Backend.Common.DAL.Models;
using Straysafe.Backend.Services.Repositories;

namespace Straysafe.Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NotificationController(IRepository<Notification> notificationsRepository) : Controller
    {
        private readonly IRepository<Notification> _notificationsRepository = notificationsRepository;

        [HttpGet("getall")]
        public IActionResult Get()
        {
            return Ok(new {  Data = _notificationsRepository.GetAll().OrderByDescending(d => d.Created) });
        }
    }
}
