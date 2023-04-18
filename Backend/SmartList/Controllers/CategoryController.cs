using Mapster;
using Microsoft.AspNetCore.Mvc;
using SmartList.Models;
using SmartList.Models.Request;
using SmartList.Models.Response;
using SmartList.Repositories;
using SmartList.Repositories.Interfaces;
using SmartList.Utilities;
using System.Linq;

namespace SmartList.Controllers;

[ApiController]
[Route("[controller]")]
public class CategoryController : ControllerBase
{

    private readonly ICategoryRepository _categoryRespository;

    public CategoryController(ICategoryRepository categoryRepository)
    {
        _categoryRespository = categoryRepository;
    }

    [HttpGet]
    [Route("/categories")]
    public Response<List<CategoryResponse>> GetAll()
    {
        var categories = _categoryRespository.GetAll().Data;
        var mappedCategories = categories
            .Select(c => new CategoryResponse() { Id = c.Id, Name = c.Name }).ToList();
        return Response<List<CategoryResponse>>.Succeeded(mappedCategories);
    }

    [HttpGet]
    [Route("/categories/{id}")]
    public Response<CategoryResponse> Get(Guid id)
    {
        var category = _categoryRespository.Get(id).Data;
        var mappedCategory = category.Adapt<CategoryResponse>();
        return Response<CategoryResponse>.Succeeded(mappedCategory);
    }

    [HttpGet]
    [Route("/categoriesWithProducts")]
    public Response<List<CategoryWithProductsResponse>> GetAllWithProducts()
    {
        var categories = _categoryRespository.GetAllWithProducts().Data;
        var mappedCategories = categories.Adapt<List<CategoryWithProductsResponse>>();

        //var mappedCategories = categories
        //    .Select(c => new CategoryWithProductsResponse() { Id = c.Id, Name = c.Name, Products = c.Products
        //    .Select(p => new ProductResponse() { Id = p.Id, Name = p.Name, CategoryId = p.CategoryId  })
        //    .ToList()}).ToList();
        return Response<List<CategoryWithProductsResponse>>.Succeeded(mappedCategories);
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
