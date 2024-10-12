using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Straysafe.Backend.Migrations
{
    /// <inheritdoc />
    public partial class Migration_1_SEED_ADMIN : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Address", "ContactNumber", "Email", "FirstName", "LastName", "Locked", "Password", "Role" },
                values: new object[] { new Guid("e5888a1f-3afe-4899-8971-5385f017ee3b"), "", "", "admin", "", "", false, "6BFCC4026B5F162799A6DC8305C09DB9C1674AC616BD5C7422A45FBB6D0816AC163047C47A1F426F4F4C6B5B5042C671EABC4FDC7310FD5B183EEF59DC274604", "Admin" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("e5888a1f-3afe-4899-8971-5385f017ee3b"));
        }
    }
}
