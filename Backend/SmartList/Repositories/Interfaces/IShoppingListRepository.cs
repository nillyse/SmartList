using SmartList.Models;
using SmartList.Models.Request;
using SmartList.Models.Responses.ShoppingList;
using SmartList.Utilities;

namespace SmartList.Repositories.Interfaces
{
    public interface IShoppingListRepository
    {
        Response<Guid> Create(CreateShoppingListRequest shoppingListRequest);
        Response<bool> Delete(Guid id);
        public Response<List<ShoppingList>> GetShoppingLists(int? count);
        Response<ShoppingList> GetShoppingList(Guid id);
        Response<Guid> AddItem(CreateShoppingListItemRequest shoppingListItemRequest);
        Response<bool> DeleteItem(Guid id);
        Response<Guid> UpdateItem(UpdateShoppingListItemRequest shoppingListItemRequest);
        Response<List<ShoppingListItemsFromCategoryResponse>> getShoppingListForView(Guid id);
        Response<List<ShoppingListPreviewResponse>> GetShoppingListsForPreview(int listCount, int itemsCount);
    }
}