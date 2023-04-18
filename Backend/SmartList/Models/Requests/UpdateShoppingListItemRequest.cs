namespace SmartList.Models.Request;

public class UpdateShoppingListItemRequest
{
    public Guid Id { get; set; }
    public int Amount { get; set; }
    public bool IsBought { get; set; }
}
