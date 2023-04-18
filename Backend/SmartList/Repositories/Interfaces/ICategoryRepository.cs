using SmartList.Models;
using SmartList.Models.Request;
using SmartList.Utilities;

namespace SmartList.Repositories.Interfaces
{
    public interface ICategoryRepository
    {
        Response<Guid> Create(CreateCategoryRequest categoryRequest);
        Response<bool> Delete(Guid id);
        Response<Category> Get(Guid id);
        Response<List<Category>> GetAll();
        Response<List<Category>> GetAllWithProducts();
    }
}