using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Straysafe.Backend.Common.DAL.Models
{
    public class ChatData
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public Guid ChatInfo { get; set; }
        public Guid Sender { get; set; }
        public Guid Recepient { get; set; }
        public string Message { get; set; } = string.Empty;
        public string Type { get; set; } = "msg"; /* msg | attachment */
        public DateTime MessageDate { get; set; } = DateTime.Now;
    }
}
