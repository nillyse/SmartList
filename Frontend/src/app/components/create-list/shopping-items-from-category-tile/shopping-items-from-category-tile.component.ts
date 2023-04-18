import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ShoppingListItem } from 'app/models/shoppingListItem';
import { shoppingListItemView } from 'app/models/View/shoppingListItemView';
import { ShoppingListService } from 'app/services/shopping-list/shopping-list.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-shopping-items-from-category-tile',
  templateUrl: './shopping-items-from-category-tile.component.html',
  styleUrls: ['./shopping-items-from-category-tile.component.less']
})
export class ShoppingItemsFromCategoryTileComponent{
  title = "title";
  description = "description";
  @Input() shoppingListFromCategory?: Array<shoppingListItemView> = new Array<shoppingListItemView>();
  @Output() deleteItemEmit = new EventEmitter();

  destroy$: Subject<boolean> = new Subject<boolean>();

  itemForm = this._formBuilder.group({
		isBought: '',
		amount: 1
	});


  constructor(private shoppingListService: ShoppingListService, private _formBuilder: FormBuilder) {
	}

  deleteItem(item: shoppingListItemView) {
		this.shoppingListService.DeleteItem(item.id)
			.pipe(takeUntil(this.destroy$))
			.subscribe((response => {
        this.deleteItemEmit.emit();
			}));
    }

  updateItem(item: shoppingListItemView, type: 'amount' | 'isBought', change: any) {
    var updatedItem : shoppingListItemView = item;
    if (type == 'amount') {
      updatedItem.amount = Number(change.data);
    }
    else if (type == 'isBought') {
      updatedItem.isBought = change.checked;
    }
    console.log(updatedItem)
		this.shoppingListService.UpdateItem(updatedItem)
			.pipe(takeUntil(this.destroy$))
			.subscribe((response => {
        
			}));

  }

}
