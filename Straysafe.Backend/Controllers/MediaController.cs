using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Straysafe.Backend.Services.Media;

namespace Straysafe.Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MediaController(IWebHostEnvironment webHostEnvironment) : Controller
    {
        private readonly IWebHostEnvironment _webHostEnvironment = webHostEnvironment;

        [HttpPost("Upload")]
        public async Task<IActionResult> UploadFile([FromForm] IFormFile file)
        {
            if (file == null)
                return BadRequest(new { Message = "Form Data should not be null", Success = false});

            if(file.FileName == null)
                return BadRequest(new { Message = "Data should be included in the form", Success = false });

            var success = await FileHandler.SaveFile(_webHostEnvironment, file);

            if (success) return Ok(new { Message = "File was uploaded", Success = true });
            return BadRequest(new { Message = "There was an issue uploading the file", Success = false });
        }

        [HttpGet("Has")]
        public IActionResult HasFile([FromQuery] string fileName)
        {
            if (string.IsNullOrEmpty(fileName)) return BadRequest(
                new
                {
                    Message = "Filename must be specified, no need the extention, as long as it matches in the backend.",
                    Success = false
                });

            // locate  all the files
            var files = Directory.GetFiles(Path.Combine(_webHostEnvironment.WebRootPath, "files"), "*.*");
            var directoryFileName = "";
            List<string> extensions = [];
            if (files.Length > 0)
            {
                foreach (var file in files)
                {
                    if (file.Contains(fileName, StringComparison.OrdinalIgnoreCase))
                    {
                        var fileExtension = file.Split(fileName)[1];
                        directoryFileName = fileName + fileExtension;
                        extensions.Add(fileExtension);
                    }
                }
            }

            if (string.IsNullOrEmpty(directoryFileName)) return NotFound(new { Message = "File not found", Success = false, extensions });

            return Ok(new { Message = "File Exists", Success = true, extensions });
        }

        [HttpGet("Download")]
        public async Task<IActionResult> DownloadFile([FromQuery] string fileName, [FromQuery] bool isProfile = false)
        {
            if (string.IsNullOrEmpty(fileName)) return BadRequest(
                new
                {
                    Message = "Filename must be specified, no need the extention, as long as it matches in the backend.",
                    Success = false
                });

            // locate  all the files
            var files = Directory.GetFiles(Path.Combine(_webHostEnvironment.WebRootPath, "files"), "*.*");
            var directoryFileName = "";
            if (files.Length > 0)
            {
                foreach (var file in files)
                {
                    if (file.Contains(fileName, StringComparison.OrdinalIgnoreCase))
                    {
                        if (file.Contains("org-"+ fileName) && isProfile) continue;
                        var fileExtension = file.Split(fileName)[1];
                        directoryFileName = fileName + fileExtension;
                        break;
                    }
                }
            }

            if (string.IsNullOrEmpty(directoryFileName) && !isProfile) return NotFound(new { Message = "File not found", Success = false });
            if (string.IsNullOrEmpty(directoryFileName) && isProfile)
            {
                directoryFileName = "DEFAULT_PROFILE.png";
            }

            var filePath = Path.Combine(_webHostEnvironment.WebRootPath, "files", directoryFileName);
            var provider = new FileExtensionContentTypeProvider();
            if (!provider.TryGetContentType(filePath, out var contentType))
            {
                contentType = "application/octet-stream";
            }

            try
            {
                var fileBytes = await System.IO.File.ReadAllBytesAsync(filePath);
                return File(fileBytes, contentType);
            }
            catch
            {
                return NoContent();
            }
        }
    }
}
