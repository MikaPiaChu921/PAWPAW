using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Straysafe.Backend.Migrations
{
    /// <inheritdoc />
    public partial class Migration_6_CHAT_TABLE_ADDED : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("974325de-7d32-452d-b8a2-28ab6e2515bd"));

            migrationBuilder.CreateTable(
                name: "ChatData",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ChatInfo = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Sender = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Recepient = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChatData", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ChatInformation",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ChatInfo = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Topic = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Metadata = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChatInformation", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Address", "ContactNumber", "Email", "FirstName", "LastName", "Locked", "Password", "Role" },
                values: new object[] { new Guid("9c365283-271b-49ea-a1f6-5b40e0edb419"), "", "", "admin", "", "", false, "6BFCC4026B5F162799A6DC8305C09DB9C1674AC616BD5C7422A45FBB6D0816AC163047C47A1F426F4F4C6B5B5042C671EABC4FDC7310FD5B183EEF59DC274604", "Admin" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChatData");

            migrationBuilder.DropTable(
                name: "ChatInformation");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("9c365283-271b-49ea-a1f6-5b40e0edb419"));

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Address", "ContactNumber", "Email", "FirstName", "LastName", "Locked", "Password", "Role" },
                values: new object[] { new Guid("974325de-7d32-452d-b8a2-28ab6e2515bd"), "", "", "admin", "", "", false, "6BFCC4026B5F162799A6DC8305C09DB9C1674AC616BD5C7422A45FBB6D0816AC163047C47A1F426F4F4C6B5B5042C671EABC4FDC7310FD5B183EEF59DC274604", "Admin" });
        }
    }
}
