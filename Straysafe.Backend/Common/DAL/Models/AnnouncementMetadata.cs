using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Straysafe.Backend.Common.DAL.Models
{
    public class AnnouncementMetadata
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; } 
        public Guid AnnouncementId { get; set; }
        public Guid User {  get; set; }
        public bool Liked { get; set; } = false;
        public bool Seen { get; set; } = false;
        public string Comments { get; set; } = string.Empty;
    }
}
