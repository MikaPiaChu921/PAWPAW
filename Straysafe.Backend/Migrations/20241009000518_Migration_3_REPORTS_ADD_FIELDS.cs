using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Straysafe.Backend.Migrations
{
    /// <inheritdoc />
    public partial class Migration_3_REPORTS_ADD_FIELDS : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("97b6ea49-0770-409b-a812-7c2da3f6b442"));

            migrationBuilder.AddColumn<string>(
                name: "Organization",
                table: "Reports",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Reporter",
                table: "Reports",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Reports",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Address", "ContactNumber", "Email", "FirstName", "LastName", "Locked", "Password", "Role" },
                values: new object[] { new Guid("4b193dba-99b4-4a12-aa80-b2e46046f349"), "", "", "admin", "", "", false, "6BFCC4026B5F162799A6DC8305C09DB9C1674AC616BD5C7422A45FBB6D0816AC163047C47A1F426F4F4C6B5B5042C671EABC4FDC7310FD5B183EEF59DC274604", "Admin" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("4b193dba-99b4-4a12-aa80-b2e46046f349"));

            migrationBuilder.DropColumn(
                name: "Organization",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "Reporter",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Reports");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Address", "ContactNumber", "Email", "FirstName", "LastName", "Locked", "Password", "Role" },
                values: new object[] { new Guid("97b6ea49-0770-409b-a812-7c2da3f6b442"), "", "", "admin", "", "", false, "6BFCC4026B5F162799A6DC8305C09DB9C1674AC616BD5C7422A45FBB6D0816AC163047C47A1F426F4F4C6B5B5042C671EABC4FDC7310FD5B183EEF59DC274604", "Admin" });
        }
    }
}
