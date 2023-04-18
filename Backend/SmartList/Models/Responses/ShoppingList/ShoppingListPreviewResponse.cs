namespace SmartList.Models.Responses.ShoppingList;

public class ShoppingListPreviewResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime UpdatedDate { get; set; }
    public List<string> ShoppingListItemsNames { get; set; }

}
