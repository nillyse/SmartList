namespace SmartList.Models.Responses.ShoppingList;

public class ShoppingListResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime UpdatedDate { get; set; }
    public List<ShoppingListItemResponse> ShoppingListItems { get; set; }

}
