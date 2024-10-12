using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Straysafe.Backend.Migrations
{
    /// <inheritdoc />
    public partial class Migration4_REPORT_METADATA : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("4b193dba-99b4-4a12-aa80-b2e46046f349"));

            migrationBuilder.AddColumn<string>(
                name: "Metadata",
                table: "Reports",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "ReportDate",
                table: "Reports",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Address", "ContactNumber", "Email", "FirstName", "LastName", "Locked", "Password", "Role" },
                values: new object[] { new Guid("770f189e-9d37-4911-bc1c-357c2acc4163"), "", "", "admin", "", "", false, "6BFCC4026B5F162799A6DC8305C09DB9C1674AC616BD5C7422A45FBB6D0816AC163047C47A1F426F4F4C6B5B5042C671EABC4FDC7310FD5B183EEF59DC274604", "Admin" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("770f189e-9d37-4911-bc1c-357c2acc4163"));

            migrationBuilder.DropColumn(
                name: "Metadata",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "ReportDate",
                table: "Reports");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Address", "ContactNumber", "Email", "FirstName", "LastName", "Locked", "Password", "Role" },
                values: new object[] { new Guid("4b193dba-99b4-4a12-aa80-b2e46046f349"), "", "", "admin", "", "", false, "6BFCC4026B5F162799A6DC8305C09DB9C1674AC616BD5C7422A45FBB6D0816AC163047C47A1F426F4F4C6B5B5042C671EABC4FDC7310FD5B183EEF59DC274604", "Admin" });
        }
    }
}
