
namespace SmartList.Models;

public class ShoppingListItem
{
    public Guid Id { get; set; }
    public int Amount { get; set; }
    public bool IsBought { get; set; }
    public Guid ProductId { get; set; }
    public Product Product { get; set; }
    public Guid ShoppingListId { get; set; }

}
