import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { CategoriesWithProductsComponent } from '@components/shared/categories-with-products/categories-with-products.component';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'app/models/category';
import { Product } from 'app/models/product';
import { CreateShoppingListItem } from 'app/models/createShoppingListItem';
import { CategoryService } from 'app/services/category/category.service';
import { ProductService } from 'app/services/product/product.service';
import { ShoppingListService } from 'app/services/shopping-list/shopping-list.service';
import { Subject, OperatorFunction, Observable, debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.less']
})
export class CreateItemComponent implements AfterViewInit {
  	destroy$: Subject<boolean> = new Subject<boolean>();
	productList: Array<Product> = [];
	productModel: any;
  	@Input() shoppingListId = '';
	itemCount: number = 1;
	categoryName: string = '';


	formatter = (x: { name: string }) => x.name;

	@ViewChild(CategoriesWithProductsComponent) updateCategoryList!:CategoriesWithProductsComponent;


	


	constructor(private productService: ProductService, private categoryService: CategoryService, private shoppingListService: ShoppingListService) {
	}

	ngAfterViewInit() {
		this.getProducts();
	}


	ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.unsubscribe(); 
		}

	onProductSelected(event: NgbTypeaheadSelectItemEvent<Product>) {
		this.categoryService.getCategory(event.item.categoryId)
			.pipe(takeUntil(this.destroy$))
			.subscribe((response => {
				this.categoryName = response.data.name;
			}));
	}
	

	getProducts() {
		this.productService.getProducts()
			.pipe(takeUntil(this.destroy$))
			.subscribe((response => {
				this.productList = response.data;
			}));
	}

	search: OperatorFunction<string, readonly Category[]> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(200),
			distinctUntilChanged(),
			map((term) =>
				term === '' ? [] : this.productList.filter((v) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
			),
		);
	
	addItem() {
		var createShoppingListItem: CreateShoppingListItem = 
		{ amount: 10, productId: this.productModel.id, ShoppingListId: this.shoppingListId };
		this.shoppingListService.AddItem(createShoppingListItem)
		.pipe(takeUntil(this.destroy$))
		.subscribe((response => {
		}));

	}

}
