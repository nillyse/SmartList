namespace SmartList.Models.Responses.ShoppingList;

public class ShoppingListItemForView
{
    public Guid Id { get; set; }
    public string ProductName { get; set; }
    public int Amount { get; set; }
    public bool IsBought { get; set; }

}
