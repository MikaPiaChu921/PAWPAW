using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Straysafe.Backend.Migrations
{
    /// <inheritdoc />
    public partial class Migration_8_ANNOUNCEMENT_TABLE : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("27a68481-3b04-4436-af7d-f489fe8b3d36"));

            migrationBuilder.CreateTable(
                name: "AnnouncementMetadata",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AnnouncementId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    User = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Liked = table.Column<bool>(type: "bit", nullable: false),
                    Seen = table.Column<bool>(type: "bit", nullable: false),
                    Comments = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnnouncementMetadata", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Announcements",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Attachment = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PostedBy = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Announcements", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Address", "ContactNumber", "Email", "FirstName", "LastName", "Locked", "Password", "Role" },
                values: new object[] { new Guid("1fbb90b8-2641-4dd7-a7d6-5b2a840bc050"), "", "", "admin", "", "", false, "6BFCC4026B5F162799A6DC8305C09DB9C1674AC616BD5C7422A45FBB6D0816AC163047C47A1F426F4F4C6B5B5042C671EABC4FDC7310FD5B183EEF59DC274604", "Admin" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AnnouncementMetadata");

            migrationBuilder.DropTable(
                name: "Announcements");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("1fbb90b8-2641-4dd7-a7d6-5b2a840bc050"));

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Address", "ContactNumber", "Email", "FirstName", "LastName", "Locked", "Password", "Role" },
                values: new object[] { new Guid("27a68481-3b04-4436-af7d-f489fe8b3d36"), "", "", "admin", "", "", false, "6BFCC4026B5F162799A6DC8305C09DB9C1674AC616BD5C7422A45FBB6D0816AC163047C47A1F426F4F4C6B5B5042C671EABC4FDC7310FD5B183EEF59DC274604", "Admin" });
        }
    }
}
