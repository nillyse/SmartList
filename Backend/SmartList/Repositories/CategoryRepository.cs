using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using SmartList.Models;
using SmartList.Models.Request;
using SmartList.Repositories.Contexts;
using SmartList.Repositories.Interfaces;
using SmartList.Utilities;

namespace SmartList.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly SmartListContext _context;
        public CategoryRepository(SmartListContext context)
        {
            _context = context;
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
                if (e.InnerException is PostgresException postgresException)
                {
                    if (postgresException.SqlState == PostgresErrorCodes.UniqueViolation)
                    {
                        return Response<Guid>.Failed("Duplicate name");
                    }
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

        public Response<Category> Get(Guid id)
        {
            var category = _context.Categories.FirstOrDefault(c => c.Id == id);
            return Response<Category>.Succeeded(category);
        }

        public Response<List<Category>> GetAllWithProducts()
        {
            var categories = _context.Categories
                .Include(p => p.Products)
                .AsNoTracking().ToList();
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
