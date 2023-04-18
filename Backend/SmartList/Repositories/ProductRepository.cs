using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using SmartList.Models;
using SmartList.Models.Request;
using SmartList.Models.Response;
using SmartList.Repositories.Contexts;
using SmartList.Repositories.Interfaces;
using SmartList.Utilities;

namespace SmartList.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly SmartListContext _context;
        public ProductRepository(SmartListContext context)
        {
            _context = context;
        }

        public Response<Guid> Create(CreateProductRequest productRequest)
        {
            var product = new Product() { Name = productRequest.Name, CategoryId = productRequest.CategoryId };
            _context.Products.Add(product);
            try
            {
                _context.SaveChanges();

            }
            catch (DbUpdateException e)
            {
                if (e.InnerException is PostgresException)
                {
                    return Response<Guid>.Failed("Failed to create product");
                }
            }
            return Response<Guid>.Succeeded(product
                .Id);
        }

        public Response<List<Product>> GetAll()
        {
            var products = _context.Products
                .Include(p => p.Category)
                .AsNoTracking()
                .ToList();
            return Response<List<Product>>.Succeeded(products);
        }

        public Response<List<Product>> GetAllFromCategory(Guid catrgoryId)
        {
            var products = _context.Products.AsNoTracking().Where(p => p.CategoryId == catrgoryId).ToList();
            return Response<List<Product>>.Succeeded(products);
        }

        public Response<bool> Delete(Guid id)
        {
            var product = _context.Products.First(c => c.Id == id);
            _context.Products.Remove(product);
            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateException e)
            {
                return Response<bool>.Failed("Failed to delete product");
            }

            return Response<bool>.Succeeded(true);
        }
    }
}
