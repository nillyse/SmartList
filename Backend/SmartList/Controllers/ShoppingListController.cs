using Mapster;
using Microsoft.AspNetCore.Mvc;
using SmartList.Models;
using SmartList.Models.Request;
using SmartList.Models.Responses.ShoppingList;
using SmartList.Repositories.Contexts;
using SmartList.Repositories.Interfaces;
using SmartList.Utilities;

namespace SmartList.Controllers;

[ApiController]
[Route("[controller]")]
public class ShoppingListController : ControllerBase
{

    private readonly IShoppingListRepository _shoppingListRespository;
    private readonly SmartListContext _context;

    public ShoppingListController(IShoppingListRepository shoppingListRespository, SmartListContext context)
    {
        _shoppingListRespository = shoppingListRespository;
        _context = context;
    }

    [HttpGet]
    [Route("/shopping-lists/{id}")]
    public Response<ShoppingListResponse> GetShoppingList(Guid id)
    {
        var shoppingLists = _shoppingListRespository.GetShoppingList(id).Data;
        var mappedShoppingList = shoppingLists.Adapt<ShoppingListResponse>();
        return Response<ShoppingListResponse>.Succeeded(mappedShoppingList);
    }


    [HttpGet]
    [Route("/shopping-lists")]
    public Response<List<ShoppingListResponse>> GetShoppingLists(int? count)
    {
        var shoppingLists = _shoppingListRespository.GetShoppingLists(count).Data;
        var mappedShoppingLists = shoppingLists.Adapt<List<ShoppingListResponse>>();
        
        return Response<List<ShoppingListResponse>>.Succeeded(mappedShoppingLists);
    }

    [HttpGet]
    [Route("/shopping-lists/view/{id}")]
    public Response<List<ShoppingListItemsFromCategoryResponse>> GetShoppingListsForView(Guid id)
    {
        var shoppingLists = _shoppingListRespository.getShoppingListForView(id);
        //var mappedShoppingLists = shoppingLists.Adapt<List<ShoppingListResponse>>();

        return shoppingLists;
    }

    [HttpGet]
    [Route("/shopping-lists/preview")]
    public Response<List<ShoppingListPreviewResponse>> getShoppingListForPreview(int listCount, int itemsCount)
    {
        var shoppingLists = _shoppingListRespository.GetShoppingListsForPreview(listCount, itemsCount);
        return shoppingLists;
    }

    [HttpPost]
    [Route("/shopping-lists")]
    public Response<Guid> Create(CreateShoppingListRequest shoppingList)
    {
        return _shoppingListRespository.Create(shoppingList);
    }

    [HttpDelete]
    [Route("/shopping-lists/{id}")]
    public Response<bool> Delete(Guid id)
    {
        return _shoppingListRespository.Delete(id);
    }

    [HttpPost]
    [Route("/shopping-lists/{id}/item")]
    public Response<Guid> AddItem(CreateShoppingListItemRequest shoppingListItemRequest)
    {
        return _shoppingListRespository.AddItem(shoppingListItemRequest);
    }

    [HttpDelete]
    [Route("/shopping-lists/item/{id}")]
    public Response<bool> DeleteItem(Guid id)
    {
        return _shoppingListRespository.DeleteItem(id);
    }

    [HttpPut]
    [Route("/shopping-lists/item/{id}")]
    public Response<Guid> UpdateItem(UpdateShoppingListItemRequest shoppingListItemRequest)
    {
        return _shoppingListRespository.UpdateItem(shoppingListItemRequest);
    }

    [HttpPost]
    [Route("/shopping-lists/test")]
    public void TestData(CreateShoppingListItemRequest shoppingListItemRequest)
    {
        var testData = new ShoppingList() 
        { 
            Name="Test", 
            ShoppingListItems = new List<ShoppingListItem>() 
            { 
                new ShoppingListItem() 
                { 
                    ProductId = new Guid("b4fbefcf-952e-48b6-a369-76289b960d70"), 
                    Amount=2, 
                    IsBought=true 
                }, 
                new ShoppingListItem()
                {
                    ProductId = new Guid("698b0e41-41ab-41e3-9bff-14b9a66eda79"),
                    Amount=1,
                    IsBought=false
                }, 
                new ShoppingListItem()
                {
                    ProductId = new Guid("e5839817-71af-49b8-a253-b8d81578a69f"),
                    Amount=3,
                    IsBought=false
                }
            } 
        };
        _context.ShoppingLists.Add(testData);
        _context.SaveChanges();
    }



    //Response<Guid> AddItem(CreateShoppingListItemRequest shoppingListItemRequest);
    //Response<bool> DeleteItem(Guid id);
    //Response<Guid> UpdateItem(UpdateShoppingListItemRequest shoppingListItemRequest);



}
