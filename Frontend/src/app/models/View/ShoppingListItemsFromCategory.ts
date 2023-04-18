import { shoppingListItemView } from "./shoppingListItemView";

export interface ShoppingListItemsFromCategory {
    categoryId: string;
    categoryName: string;
    items?: Array<shoppingListItemView>;
}
