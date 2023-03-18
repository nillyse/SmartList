import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingList } from 'app/models/shoppingList';
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
	shoppingListForView!: any;

	unassignedTasks: DragDropListItem[] = [
		{
		  id: '1',
		  title: 'Task 1',
		  description: 'This is description of tasks 1'
		},
		{
		  id: '2',
		  title: 'Task 2',
		  description: 'This is description of tasks 2'
		},
		{
		  id: '3',
		  title: 'Task 3',
		  description: 'This is description of tasks 3'
		}
	  ];
	
	  assignedTasks = [
		{
		  id: '4',
		  title: 'Task 4',
		  description: 'This is description of tasks 4'
		},
		{
		  id: '5',
		  title: 'Task 5',
		  description: 'This is description of tasks 5'
		},
		{
		  id: '6',
		  title: 'Task 6',
		  description: 'This is description of tasks 6'
		}
	  ];
	
	constructor(private shoppingListService: ShoppingListService, private route: ActivatedRoute) {

	}
	ngAfterViewInit() {
		if(this.shoppingListId != '')
			this.GetShoppingListsForView()
	}

	ngOnInit(): void {
		this.shoppingListId = this.route.snapshot.paramMap.get('id') || '';
	  }

	
	//formatter = (item: Item) => item.name;

	// search: OperatorFunction<string, readonly { id: number; name: string }[]> = (text$: Observable<string>) =>
	// 	text$.pipe(
	// 		debounceTime(200),
	// 		distinctUntilChanged(),
	// 		filter((term) => term.length >= 2),
	// 		map((term) => items.filter((item) => new RegExp(term, 'mi').test(item.name)).slice(0, 10)),
	// 	);


	createShoppingList() {
		var shoppingList: ShoppingList = {id: "", name: this.shoppingListTitle, createdDate: new Date(), UpdatedDate: new Date()}
		this.shoppingListService.Create(shoppingList)
			.pipe(takeUntil(this.destroy$))
			.subscribe((response => {
				this.shoppingListId = response.data;
				this.GetShoppingListsForView()
			}));
	}

	deleteShoppingList() {
		this.shoppingListService.Delete(this.shoppingListId)
			.pipe(takeUntil(this.destroy$))
			.subscribe((response => {
				 if(response.data)
				 	this.shoppingListId = '';
			}));
	}

	GetShoppingListsForView() {
		this.shoppingListService.GetShoppingListsForView(this.shoppingListId)
			.pipe(takeUntil(this.destroy$))
			.subscribe((response => {
				 if(response.data)
				 	this.shoppingListForView = response.data;
					 console.log(this.shoppingListForView);
			}));
	  }
	

	// updateItemCount(event: any, item: Item) {
	// 	var newProductCount = parseInt(event.target.value);
	// 	this.shoppingList.set(item, newProductCount);
	// }
	drop(event: CdkDragDrop<DragDropListItem[]>) {
		if (event.previousContainer === event.container) {
		  moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
		  transferArrayItem(event.previousContainer.data,
							event.container.data,
							event.previousIndex,
							event.currentIndex);
		}
	  }
	

}

