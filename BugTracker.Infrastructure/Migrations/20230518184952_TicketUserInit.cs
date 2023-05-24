using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BugTracker.Infrastructure.Migrations
{
    public partial class TicketUserInit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
            name: "TicketUser",
            columns: table => new
            {
                Id = table.Column<int>(nullable: false)
                    .Annotation("SqlServer:Identity", "1, 1"),
                TicketId = table.Column<int>(nullable: false),
                ApplicationUserId = table.Column<string>(nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_TicketUser", x => x.Id);
                table.ForeignKey(
                    name: "FK_TicketUser_Ticket_TicketId",
                    column: x => x.TicketId,
                    principalTable: "Ticket",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
                table.ForeignKey(
                    name: "FK_TicketUser_AspNetUsers_ApplicationUserId",
                    column: x => x.ApplicationUserId,
                    principalTable: "AspNetUsers",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Restrict);
            });

            migrationBuilder.CreateIndex(
                name: "IX_TicketUser_ApplicationUserId",
                table: "TicketUser",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_TicketUser_TicketId",
                table: "TicketUser",
                column: "TicketId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
            name: "TicketUser");
        }
    }
}
