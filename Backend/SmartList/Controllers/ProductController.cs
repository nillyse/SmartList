using Mapster;
using Microsoft.AspNetCore.Mvc;
using SmartList.Models;
using SmartList.Models.Response;
using SmartList.Repositories;
using SmartList.Repositories.Interfaces;
using SmartList.Utilities;

namespace SmartList.Controllers;

[ApiController]
[Route("[controller]")]
public class ProductController : ControllerBase
{

    private readonly IProductRepository _productRespository;

    public ProductController(IProductRepository productRepository)
    {
        _productRespository = productRepository;
    }

    [HttpGet]
    [Route("/products")]
    public Response<List<ProductResponse>> GetAll()
    {
        var products = _productRespository.GetAll().Data;
        var mappedProducts = products.Adapt<List<ProductResponse>>();
        return Response<List<ProductResponse>>.Succeeded(mappedProducts);
    }

    [HttpGet]
    [Route("/products/{categoryId}")]
    public Response<List<ProductResponse>> GetAllFromCategory(Guid categoryId)
    {
        var products = _productRespository.GetAllFromCategory(categoryId).Data;
        var mappedProducts = products
            .Select(p => new ProductResponse() { Id = p.Id, CategoryId = p.CategoryId, Name = p.Name  }).ToList();
        return Response<List<ProductResponse>>.Succeeded(mappedProducts);
    }

    [HttpPost]
    [Route("/product")]
    public Response<Guid> Add(CreateProductRequest product)
    {
        return _productRespository.Create(product);
    }

    [HttpDelete]
    [Route("/product")]
    public Response<bool> Delete(Guid id)
    {
        return _productRespository.Delete(id);
    }

}
