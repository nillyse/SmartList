import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingList } from 'app/models/shoppingList';
import { ShoppingListItemsFromCategory } from 'app/models/View/ShoppingListItemsFromCategory';
import { ShoppingListService } from 'app/services/shopping-list/shopping-list.service';
import { Subject, takeUntil } from 'rxjs';


export interface DragDropListItem {
	id: string;
	title: string;
	description: string;
}

@Component({
	selector: 'app-create-list',
	templateUrl: './create-list.component.html',
	styleUrls: ['./create-list.component.less']
})

export class CreateListComponent implements AfterViewInit, OnInit {
	destroy$: Subject<boolean> = new Subject<boolean>();
	shoppingListTitle!: string;
	shoppingListId: string = '';
	shoppingListForView: Array<ShoppingListItemsFromCategory> = new Array<ShoppingListItemsFromCategory>();
	shoppingListForViewOrder: Array<string> = new Array<string>();
	

	constructor(private shoppingListService: ShoppingListService, private route: ActivatedRoute) {

	}
	ngAfterViewInit() {
		if (this.shoppingListId != '')
			this.GetShoppingListsForView()
	}

	ngOnInit(): void {
		this.shoppingListId = this.route.snapshot.paramMap.get('id') || '';
	}

	createShoppingList() {
		this.savePreviousOrder();
		var shoppingList: ShoppingList = { id: "", name: this.shoppingListTitle, createdDate: new Date(), UpdatedDate: new Date() }
		this.shoppingListService.Create(shoppingList)
			.pipe(takeUntil(this.destroy$))
			.subscribe((response => {
				this.shoppingListId = response.data;
				this.GetShoppingListsForView()
			}));
		this.restorePreviousOrder();
	}

	savePreviousOrder() {
		if (this.shoppingListForView.length > 0) {
			this.shoppingListForViewOrder = [];
			this.shoppingListForView.forEach(sl => this.shoppingListForViewOrder?.push(sl.categoryId));
			console.log(this.shoppingListForViewOrder)
		}
	}

	restorePreviousOrder() {
		if (this.shoppingListForViewOrder?.length <= 0) {
			return
		}
		var restoredOrder: Array<ShoppingListItemsFromCategory> = new Array<ShoppingListItemsFromCategory>();
		restoredOrder = [];
		this.shoppingListForViewOrder?.forEach(o => {
			var foundList = this.shoppingListForView.find(sl => sl.categoryId == o);
			if (foundList != undefined)
				restoredOrder.push(foundList);
		});
		this.shoppingListForView = restoredOrder;
	}

	deleteShoppingList() {
		this.shoppingListService.Delete(this.shoppingListId)
			.pipe(takeUntil(this.destroy$))
			.subscribe((response => {
				if (response.data)
					this.shoppingListId = '';
			}));
	}

	GetShoppingListsForView() {
		this.shoppingListService.GetShoppingListsForView(this.shoppingListId)
			.pipe(takeUntil(this.destroy$))
			.subscribe((response => {
				console.log(response)
				if (response.data) {
					this.savePreviousOrder();
					this.shoppingListForView = response.data;
					this.restorePreviousOrder();
				}
			}));
		
	}

	drop(event: any) {
		moveItemInArray(this.shoppingListForView, event.previousIndex, event.currentIndex);
	}


}

