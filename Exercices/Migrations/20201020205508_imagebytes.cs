using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Exercices.Migrations
{
    public partial class imagebytes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "ImageBytes",
                table: "Images",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageBytes",
                table: "Images");
        }
    }
}
