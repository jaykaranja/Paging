using System.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using PagingTest.Interfaces;
using PagingTest.Models;

namespace PagingTest.Controllers;

[ApiController]
[Route("[controller]")]
public class TestController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly string _connString;
    private readonly ICacheService _cacheService;

    public TestController(IConfiguration configuration, ICacheService cacheService)
    {
        _configuration = configuration;
        _connString = _configuration.GetConnectionString("databaseConnString") ?? throw new NullReferenceException("Database connection string not found. Ensure that have your database connection string set in your app configuration settings.");
        _cacheService = cacheService;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        await Task.Delay(2000);
        return Ok();
    }

    [HttpGet]
    [Route("GetRoles")]
    public async Task<ActionResult<List<Role>>> GetRoles([FromQuery] int page, int pageSize)
    {

        // Check from cache
        // var cachedData = _cacheService.GetData<IEnumerable<Role>>($"roles.{page}.{pageSize}");

        //if (cachedData != null && cachedData.Any())
        //{
        //    return Ok(cachedData);
        //}

        try
        {
            // Set up your ADO.NET connection and command
            using SqlConnection connection = new(_connString);
            connection.Open();

            using SqlCommand command = new("spPagingTestsV3", connection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("page", page);
            command.Parameters.AddWithValue("pageSize", pageSize);

            // Execute the stored procedure and fetch data
            using SqlDataReader reader = await command.ExecuteReaderAsync();
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

            // Set cache
            //_cacheService.SetData<IEnumerable<Role>>(($"roles.{page}.{pageSize}"), data, DateTimeOffset.Now.AddMinutes(15));
            // Return from DB
            return Ok(data);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

}
