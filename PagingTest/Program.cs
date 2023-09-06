using PagingTest.Interfaces;
using PagingTest.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.



builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<ICacheService, CacheService>();

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(ops => {
        string[] origins = {
                        "http://localhost:5173",
                        "http://localhost:5173/",
                    };
        ops.WithOrigins(origins).AllowCredentials().WithMethods("POST", "GET", "PUT", "DELETE").AllowAnyHeader();
    });
}


app.UseHttpsRedirection();

app.UseAuthorization();


app.MapControllers();

app.Run();
