using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Straysafe.Backend.Common.DAL.Models
{
    public class Donation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string DonorId { get; set; } = string.Empty;
        public DateTime IssueDate { get; set; } = DateTime.Now;
        public string Remarks { get; set; } = string.Empty;
        public double Amount { get; set; } = 0;
    }
}
