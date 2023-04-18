using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using SmartList.Models;
using SmartList.Models.Request;
using SmartList.Models.Responses.ShoppingList;
using SmartList.Repositories.Contexts;
using SmartList.Repositories.Interfaces;
using SmartList.Utilities;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace SmartList.Repositories
{
    public class ShoppingListRepository : IShoppingListRepository
    {
        private readonly SmartListContext _context;
        public ShoppingListRepository(SmartListContext context)
        {
            _context = context;
        }

        public Response<Guid> Create(CreateShoppingListRequest shoppingListRequest)
        {
            var shoppingList = new ShoppingList() { Name = shoppingListRequest.Name };
            _context.ShoppingLists.Add(shoppingList);
            try
            {
                _context.SaveChanges();

            }
            catch (DbUpdateException e)
            {
                if (e.InnerException is PostgresException postgresException)
                {
                    return Response<Guid>.Failed("Failed to create shopping list");
                }
            }
            return Response<Guid>.Succeeded(shoppingList.Id);
        }

        public Response<Guid> AddItem(CreateShoppingListItemRequest shoppingListItemRequest)
        {
            var duplicateItem = _context.ShoppingListItems.Where(sli => sli.ProductId == shoppingListItemRequest.ProductId && sli.ShoppingListId == shoppingListItemRequest.ShoppingListId).FirstOrDefault();
            if (duplicateItem != null) {
                duplicateItem.Amount += shoppingListItemRequest.Amount;
                _context.SaveChanges();
                return Response<Guid>.Succeeded(duplicateItem.Id);
            }
            var shoppingListItem = shoppingListItemRequest.Adapt<ShoppingListItem>();
            _context.ShoppingListItems.Add(shoppingListItem);
            try
            {
                _context.SaveChanges();

            }
            catch (DbUpdateException e)
            {
                if (e.InnerException is PostgresException postgresException)
                {
                    return Response<Guid>.Failed("Failed to add item to shopping list");
                }
            }
            return Response<Guid>.Succeeded(shoppingListItem.Id);
        }

        public Response<bool> DeleteItem(Guid id)
        {
            var shoppingListItem = _context.ShoppingListItems.FirstOrDefault(s => s.Id == id);
            if (shoppingListItem == null)
            {
                return Response<bool>.Failed("Failed to dalete shopping list item");
            }

            _context.ShoppingListItems.Remove(shoppingListItem);
            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateException e)
            {
                return Response<bool>.Failed("Failed to delete shopping list item");
            }

            return Response<bool>.Succeeded(true);
        }

        public Response<Guid> UpdateItem(UpdateShoppingListItemRequest shoppingListItemRequest)
        {
            var shoppingListItem = _context.ShoppingListItems.FirstOrDefault(s => s.Id == shoppingListItemRequest.Id);
            if (shoppingListItem == null)
            {
                return Response<Guid>.Failed("Failed to update shopping list item");
            }
            shoppingListItem.Amount = shoppingListItemRequest.Amount;
            shoppingListItem.IsBought = shoppingListItemRequest.IsBought;
            _context.ShoppingListItems.Update(shoppingListItem);
            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateException e)
            {
                return Response<Guid>.Failed("Failed to update shopping list item");
            }

            return Response<Guid>.Succeeded(shoppingListItem.Id);
        }



        public Response<List<ShoppingList>> GetShoppingLists(int? itemCount)
        {
            List<ShoppingList> ShoppingLists;

            if (itemCount == null)
            {
                ShoppingLists = _context.ShoppingLists.AsNoTracking().ToList();
            }
            else
            {
                ShoppingLists = _context.ShoppingLists
                    .Include(s => s.ShoppingListItems.Take(itemCount.Value))
                    .AsNoTracking().ToList();
            }
            return Response<List<ShoppingList>>.Succeeded(ShoppingLists);
        }

        public Response<List<ShoppingListPreviewResponse>> GetShoppingListsForPreview(int listCount, int itemsCount)
        {
            var ShoppingLists = _context.ShoppingLists
                .Include(s => s.ShoppingListItems).Take(listCount)
                .Select(sl => new ShoppingListPreviewResponse()
                {
                    Id = sl.Id,
                    Name = sl.Name,
                    CreatedDate = sl.CreatedDate,
                    UpdatedDate = sl.UpdatedDate,
                    ShoppingListItemsNames = sl.ShoppingListItems.Select(sli => sli.Product.Name).Take(itemsCount).ToList()
                }).ToList();
                
            return Response<List<ShoppingListPreviewResponse>>.Succeeded(ShoppingLists);

        }


        public Response<ShoppingList> GetShoppingList(Guid id)
        {
            var ShoppingList = _context.ShoppingLists
                .Include(s => s.ShoppingListItems)
                .FirstOrDefault(s => s.Id == id);
            return Response<ShoppingList>.Succeeded(ShoppingList);
        }

        public Response<bool> Delete(Guid id)
        {
            var shoppingList = _context.ShoppingLists.First(s => s.Id == id);
            _context.ShoppingLists.Remove(shoppingList);
            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateException e)
            {
                return Response<bool>.Failed("Failed to delete shopping list");
            }

            return Response<bool>.Succeeded(true);
        }
        public Response<List<ShoppingListItemsFromCategoryResponse>> getShoppingListForView(Guid id)
        {
            var categories = _context.ShoppingListItems
                .Where(sli => sli.ShoppingListId == id)
                .Include(sli => sli.Product)
                .GroupBy(sli => sli.Product.CategoryId)
                .Select(group => new ShoppingListItemsFromCategoryResponse()
                {
                    CategoryId= group.ToList().First().Product.Category.Id,
                    CategoryName = group.ToList().First().Product.Category.Name,
                    Items = group.ToList().Adapt<List<ShoppingListItemForView>>(),
                }).ToList();

            return Response<List<ShoppingListItemsFromCategoryResponse>>.Succeeded(categories);
        }


    }
}
