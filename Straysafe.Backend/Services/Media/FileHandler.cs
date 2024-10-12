namespace Straysafe.Backend.Services.Media
{
    public class FileHandler
    {
        public static async Task<bool> SaveFile(IWebHostEnvironment hostEnvironment, IFormFile formFile)
        {

            // check if file name is null, if yes, return null
            if (formFile.FileName == null) return false;

            // check if filename length is 0, return null
            if (formFile.FileName.Length == 0) return false;

            // get the file type (extension)
            var fileType = Path.GetExtension(formFile.FileName);
            var fileName = Path.GetFileNameWithoutExtension(formFile.FileName);



            // check if Image directory exists, otherwise create a new directory
            bool imageDir = Directory.Exists(Path.Combine(hostEnvironment.WebRootPath, "files/"));
            if (!imageDir) Directory.CreateDirectory(Path.Combine(hostEnvironment.WebRootPath, "files/"));

            // save path (wwwroot/Images/{guid}.{ext})
            string savePath = Path.Combine(hostEnvironment.WebRootPath, "files/", $"{fileName}{fileType}");

            try
            {
                // copy the file using file stream (upload)
                using FileStream stream = new(savePath, FileMode.Create);
                await formFile.CopyToAsync(stream);
                stream.Close();
            }
            catch { return false; }

            return true;
        }

        public static bool DeleteFile(IWebHostEnvironment hostEnvironment, string filename)
        {
            string filePath = Path.Combine(hostEnvironment.WebRootPath, "files", $"{filename}");

            // check if file exists, if exists, delete
            try
            {
                bool fileExists = File.Exists(filePath);
                if (fileExists)
                {
                    File.Delete(filePath);
                }
                else { return false; }
            }
            catch { return false; }
            return true;
        }
    }
}
