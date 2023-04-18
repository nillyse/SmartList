namespace SmartList.Models.Request;

public class CreateShoppingListItemRequest
{
    public int Amount { get; set; }
    public Guid ProductId { get; set; }
    public Guid ShoppingListId { get; set; }
}
