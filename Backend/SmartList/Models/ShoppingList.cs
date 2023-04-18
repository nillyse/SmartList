
namespace SmartList.Models;

public class ShoppingList
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime UpdatedDate { get; set; }
    public List<ShoppingListItem> ShoppingListItems { get; set; }

}
