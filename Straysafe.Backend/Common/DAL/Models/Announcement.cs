namespace Straysafe.Backend.Common.DAL.Models
{
    public class Announcement
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string Attachment { get; set; } = string.Empty;
        public DateTime Date { get; set; } = DateTime.Now;
        public string PostedBy { get; set; } = string.Empty;
    }
}
