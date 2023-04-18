import { ShoppingListItem } from "./shoppingListItem";

export interface ShoppingList {
    id: string;
    name: string;
    createdDate: Date;
    UpdatedDate: Date;
    items?: Array<ShoppingListItem>;
}
