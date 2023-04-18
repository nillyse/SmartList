using SmartList.Models;
using SmartList.Models.Response;
using SmartList.Utilities;

namespace SmartList.Repositories.Interfaces
{
    public interface IProductRepository
    {
        Response<Guid> Create(CreateProductRequest productRequest);
        Response<bool> Delete(Guid id);
        Response<List<Product>> GetAll();
        Response<List<Product>> GetAllFromCategory(Guid catrgoryId);
    }
}