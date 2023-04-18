namespace SmartList.Models.Responses.ShoppingList;

public class ShoppingListItemsFromCategoryResponse
{
    public Guid CategoryId { get; set; }
    public string CategoryName { get; set; }
    public List<ShoppingListItemForView> Items { get; set; }

}
