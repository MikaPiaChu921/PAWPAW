using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Straysafe.Backend.Common.DAL.Models
{
    public class ChatInformation
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid ChatInfo { get; set; } = Guid.NewGuid();
        public string Topic { get; set; } = string.Empty;
        public string Metadata { get; set; } = string.Empty;
    }
}
