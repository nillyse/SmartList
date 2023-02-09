using Microsoft.AspNetCore.Mvc;
using SmartList.Repositories;
using SmartList.Repositories.Contexts;
using SmartList.Utilities;

namespace SmartList.Controllers;

[ApiController]
[Route("[controller]")]
public class CategoryController : ControllerBase
{
    private static readonly string[] Categories = new[]
    {
        "Nabia³", "Pieczywo", "S³odycze", "Warzywa", "Owoce"
    };

    private readonly ILogger<CategoryController> _logger;
    private readonly CategoryRepository _categoryRespository;

    public CategoryController(ILogger<CategoryController> logger)
    {
        _logger = logger;
        _categoryRespository = new CategoryRepository();
    }

    [HttpGet]
    [Route("/categories")]
    public Response<List<Category>> GetAll()
    {
        return _categoryRespository.GetAll();
    }

    [HttpPost]
    [Route("/category")]
    public Response<Guid> Add(CreateCategoryRequest category)
    {
        return _categoryRespository.Create(category);
    }

    [HttpDelete]
    [Route("/category")]
    public Response<bool> Delete(Guid id)
    {
        return _categoryRespository.Delete(id);
    }

}
