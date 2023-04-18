namespace SmartList.Models.Responses.ShoppingList;

public class ShoppingListItemResponse
{
    public Guid Id { get; set; }
    public int Amount { get; set; }
    public bool IsBought { get; set; }
    public Guid ProductId { get; set; }
    public Guid ShoppingListId { get; set; }

}
