import { KeyValue } from '@angular/common';
import { Component } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, map, Observable, OperatorFunction } from 'rxjs';

type Item = { id: number; name: string };

const items: Item[] = [
	{ id: 0, name: 'Alabama' },
	{ id: 1, name: 'Alaska' },
	{ id: 2, name: 'American Samoa' },
	{ id: 3, name: 'Arizona' },
	{ id: 4, name: 'Arkansas' },
	{ id: 5, name: 'California' },
	{ id: 6, name: 'Colorado' },
	{ id: 7, name: 'Connecticut' },
	{ id: 8, name: 'Delaware' },
	{ id: 9, name: 'District Of Columbia' },
	{ id: 10, name: 'Federated States Of Micronesia' },
	{ id: 11, name: 'Florida' },
	{ id: 12, name: 'Georgia' },
	{ id: 13, name: 'Guam' },
	{ id: 14, name: 'Hawaii' },
	{ id: 15, name: 'Idaho' },
	{ id: 16, name: 'Illinois' },
	{ id: 17, name: 'Indiana' },
	{ id: 18, name: 'Iowa' },
	{ id: 19, name: 'Kansas' },
	{ id: 20, name: 'Kentucky' },
	{ id: 21, name: 'Louisiana' },
	{ id: 22, name: 'Maine' },
	{ id: 23, name: 'Marshall Islands' },
	{ id: 24, name: 'Maryland' },
	{ id: 25, name: 'Massachusetts' },
	{ id: 26, name: 'Michigan' },
	{ id: 27, name: 'Minnesota' },
	{ id: 28, name: 'Mississippi' },
	{ id: 29, name: 'Missouri' },
	{ id: 30, name: 'Montana' },
	{ id: 31, name: 'Nebraska' },
	{ id: 32, name: 'Nevada' },
	{ id: 33, name: 'New Hampshire' },
	{ id: 34, name: 'New Jersey' },
	{ id: 35, name: 'New Mexico' },
	{ id: 36, name: 'New York' },
	{ id: 37, name: 'North Carolina' },
	{ id: 38, name: 'North Dakota' },
	{ id: 39, name: 'Northern Mariana Islands' },
	{ id: 40, name: 'Ohio' },
	{ id: 41, name: 'Oklahoma' },
	{ id: 42, name: 'Oregon' },
	{ id: 43, name: 'Palau' },
	{ id: 44, name: 'Pennsylvania' },
	{ id: 45, name: 'Puerto Rico' },
	{ id: 46, name: 'Rhode Island' },
	{ id: 47, name: 'South Carolina' },
	{ id: 48, name: 'South Dakota' },
	{ id: 49, name: 'Tennessee' },
	{ id: 50, name: 'Texas' },
	{ id: 51, name: 'Utah' },
	{ id: 52, name: 'Vermont' },
	{ id: 53, name: 'Virgin Islands' },
	{ id: 54, name: 'Virginia' },
	{ id: 55, name: 'Washington' },
	{ id: 56, name: 'West Virginia' },
	{ id: 57, name: 'Wisconsin' },
	{ id: 58, name: 'Wyoming' }
];




@Component({
	selector: 'app-create-list',
	templateUrl: './create-list.component.html',
	styleUrls: ['./create-list.component.less']
})

export class CreateListComponent {
	//   shoppingList : Record<Item, number> = [];
	shoppingList = new Map<Item, number>();
	//   shoppingList : Array<Item> = [];
	itemName: string = '';
	itemCount: number = 1;
	public model: Item = { id: -1, name: '' };

	formatter = (item: Item) => item.name;

	search: OperatorFunction<string, readonly { id: number; name: string }[]> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(200),
			distinctUntilChanged(),
			filter((term) => term.length >= 2),
			map((term) => items.filter((item) => new RegExp(term, 'mi').test(item.name)).slice(0, 10)),
		);

	addItem() {
		if (this.model.id >= 0 && this.model.id !== undefined) {
			var productCount = this.shoppingList.get(this.model)
			if (productCount != undefined) {
				this.shoppingList.set(this.model, this.itemCount+productCount)
			}
			else {
				this.shoppingList.set(this.model, this.itemCount)
			}
		}
		this.model = { id: -1, name: '' };
		this.itemCount = 1;
	}

	deleteItem(item: Item) {
		this.shoppingList.delete(item);
	}

	updateItemCount(event: any, item: Item) {
		var newProductCount = parseInt(event.target.value);
		this.shoppingList.set(item, newProductCount);
	}

}
