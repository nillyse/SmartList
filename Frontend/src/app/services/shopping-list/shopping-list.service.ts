import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShoppingList } from 'app/models/shoppingList';
import { Response } from 'app/models/response';
import { ShoppingListItem } from 'app/models/shoppingListItem';
import { CreateShoppingListItem } from 'app/models/createShoppingListItem';
import { ShoppingListItemsFromCategory } from 'app/models/View/ShoppingListItemsFromCategory';
import { shoppingListItemView } from 'app/models/View/shoppingListItemView';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  baseUrl = 'https://localhost:7185';

  constructor(private http: HttpClient) {
  }


  GetShoppingList(shoppingListId: string) {
    return this.http.get<Response<ShoppingList>>(`${this.baseUrl}/shopping-lists/${shoppingListId}`);
  }

  GetShoppingLists(count: number) {
    return this.http.get<Response<Array<ShoppingList>>>( `${this.baseUrl}/shopping-lists`, {params: { count: count}});
  }

  GetShoppingListsForPreview(listCount: number, itemsCount: number) {
    return this.http.get<Response<Array<ShoppingList>>>( `${this.baseUrl}/shopping-lists/preview`, {params: { listCount: listCount, itemsCount: itemsCount}});
  }

  Create(shoppingList: ShoppingList) {
    return this.http.post<Response<string>>(this.baseUrl+"/shopping-lists", shoppingList);
  }

  Delete(shoppingListId: string) {
    return this.http.delete<Response<boolean>>(this.baseUrl+"/shopping-lists/${shoppingList.id}", {params: { id: shoppingListId}});
  }

  GetShoppingListsForView(shoppingListId: string) {
    return this.http.get<Response<Array<ShoppingListItemsFromCategory>>>(`${this.baseUrl}/shopping-lists/view/${shoppingListId}`);
  }

  AddItem(createShoppingListItem: CreateShoppingListItem) {
    return this.http.post<Response<string>>(`${this.baseUrl}/shopping-lists/${createShoppingListItem.ShoppingListId}/item`, createShoppingListItem);
  }

  DeleteItem(shoppingListItemId: string) {
    return this.http.delete<Response<Array<ShoppingList>>>( `${this.baseUrl}/shopping-lists/item/${shoppingListItemId}`);
  }
  
  UpdateItem(shoppingListItem: shoppingListItemView) {
    return this.http.put<Response<string>>( `${this.baseUrl}/shopping-lists/item/${shoppingListItem.id}`, shoppingListItem);
  }
}
