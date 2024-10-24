using Microsoft.AspNetCore.Mvc;
using Straysafe.Backend.Common.DAL.Models;
using Straysafe.Backend.Services.Chat;
using Straysafe.Backend.Services.Repositories;

namespace Straysafe.Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChatController(IRepository<ChatData> chatDataRepository, SessionSingleton session) : Controller
    {
        private readonly IRepository<ChatData> _chatDataRepository = chatDataRepository;
        private readonly SessionSingleton _session = session;

        [HttpPost("submit")]
        public async Task<IActionResult> SubmitChat(ChatData chatData)
        {
            var success = await _chatDataRepository.AddAsync(chatData);
            _session.SetHasNewChat(chatData.ChatInfo, true);
            return Ok(new { Message = success ? "Success" : "Fail"});
        }

        [HttpGet("getall")]
        public IActionResult Retrieve()
        {
            return Ok(_chatDataRepository.GetAll());
        }

        [HttpGet("getlatest")]
        public IActionResult Retrieve([FromQuery] string chatInformation)
        {
            return Ok(new { Latest = _chatDataRepository.GetAll().Where(c => c.ChatInfo.ToString() == chatInformation).LastOrDefault() });
        }

        [HttpGet("getfirst")]
        public IActionResult GetFirst([FromQuery] string chatInformation)
        {
            return Ok(new { First = _chatDataRepository.GetAll().Where(c => c.ChatInfo.ToString() == chatInformation).FirstOrDefault() });
        }
    }
}
