using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using SmartList.Repositories.Contexts;
using SmartList.Utilities;
using System.Reflection.Metadata;

namespace SmartList.Repositories
{
    public class CategoryRepository
    {
        private readonly SmartListContext _context;
        public CategoryRepository()
        {
            _context = new SmartListContext();
        }

        public Response<Guid> Create(CreateCategoryRequest categoryRequest)
        {
            var category = new Category() { Name = categoryRequest.Name };
            _context.Categories.Add(category);
            try
            {
                _context.SaveChanges();

            }
            catch (DbUpdateException e)
            {
                if (e.InnerException is PostgresException)
                {
                    return Response<Guid>.Failed("Failed to create category");
                }
            }
            return Response<Guid>.Succeeded(category.Id);
        }

        public Response<List<Category>> GetAll()
        {
            var categories = _context.Categories.AsNoTracking().ToList();
            return Response<List<Category>>.Succeeded(categories);
        }

        public Response<bool> Delete(Guid id)
        {
            var category = _context.Categories.First(c => c.Id == id);
            _context.Categories.Remove(category);
            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateException e)
            {
                return Response<bool>.Failed("Failed to delete category");
            }

            return Response<bool>.Succeeded(true);
        }
    }
}
