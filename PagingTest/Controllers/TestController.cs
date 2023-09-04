using System.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using PagingTest.Models;

namespace PagingTest.Controllers;

[ApiController]
[Route("[controller]")]
public class TestController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly string _connString;

    public TestController(IConfiguration configuration)
    {
        _configuration = configuration;
        _connString = _configuration.GetConnectionString("databaseConnString") ?? throw new NullReferenceException("Confirm you have your connection string in your configuration.");
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        await Task.Delay(2000);
        return Ok();
    }

    [HttpGet]
    [Route("GetRoles")]
    public IActionResult GetRoles([FromQuery] int page, int pageSize)
    {
        try
        {
            // Set up your ADO.NET connection and command
            using SqlConnection connection = new(_connString);
            connection.Open();

            using SqlCommand command = new("spPagingTests", connection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("page", page);
            command.Parameters.AddWithValue("pageSize", pageSize);

            // Execute the stored procedure and fetch data
            using SqlDataReader reader = command.ExecuteReader();
            var data = new List<Role>();

            while (reader.Read())
            {
                var item = new Role
                {
                    RoleName = reader["RoleName"].ToString(),
                    MenuClass = reader["RoleID"].ToString(),
                    MenuItem = reader["RoleDescription"].ToString(),
                    Module = reader["CreatedDate"].ToString(),
                    Narration = reader["Narration"].ToString(),
                    RoleDescription = reader["RoleDescription"].ToString()

                };

                data.Add(item);
            }

            return Ok(data);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
