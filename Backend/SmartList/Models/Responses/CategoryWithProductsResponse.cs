namespace SmartList.Models.Response;

public class CategoryWithProductsResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public List<ProductResponse> Products { get; set; }

}
