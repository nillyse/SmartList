import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'app/models/category';
import { Product } from 'app/models/product';
import { CreateShoppingListItem } from 'app/models/createShoppingListItem';
import { CategoryService } from 'app/services/category/category.service';
import { ProductService } from 'app/services/product/product.service';
import { ShoppingListService } from 'app/services/shopping-list/shopping-list.service';
import { Subject, Observable, takeUntil, map } from 'rxjs';
import { FormBuilder, FormControl } from '@angular/forms';
import { OnInit } from '@angular/core';
import { startWith } from 'rxjs';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';

export const _filter = (opt: Product[], value: string): Product[] => {
	if (!value)
		return [];
	const filterValue = value.toLowerCase();
	return opt.filter(item => item.name.toLowerCase().includes(filterValue));
};
@Component({
	selector: 'app-create-item',
	templateUrl: './create-item.component.html',
	styleUrls: ['./create-item.component.less']
})
export class CreateItemComponent implements AfterViewInit, OnInit {
	@Input() shoppingListId = '';
	@Output() newItemEvent = new EventEmitter();

	destroy$: Subject<boolean> = new Subject<boolean>();

	categoriesWithProductsList: Array<Category> = new Array<Category>();
	productList: Array<Product> = new Array<Product>();

	choosenProduct!: Product;
	categoryName: string = '';

	productGroupOptions?: Observable<Category[]>;
	productForm = this._formBuilder.group({
		productGroup: '',
		amount: 1
	});

	constructor(private productService: ProductService, private categoryService: CategoryService, private shoppingListService: ShoppingListService, private _formBuilder: FormBuilder) {
	}

	ngOnInit() {
		this.productGroupOptions = this.productForm.get('productGroup')!.valueChanges.pipe(
			startWith(''),
			map(value => this._filterGroup(value || '')),
		);
	}


	ngAfterViewInit() {
		this.getProducts();
		this.getCategoriesWithProducts();
	}


	ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.unsubscribe();
	}

	convert(products: Product[] | MatTableDataSource<Product, MatTableDataSourcePaginator>) {
		return products as Array<Product>;
	}

	private _filterGroup(value: string): Category[] {
		if (value) {
			return this.categoriesWithProductsList
				.map(category => ({ id: category.id, name: category.name, products: _filter((category.products as Array<Product>), value) }))
				.filter(group => (group.products as Array<Product>).length > 0);
		}

		return this.categoriesWithProductsList;

	}

	onProductSelected(product: Product) {
		this.choosenProduct = product;
		this.categoryService.getCategory(product.categoryId)
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

	getCategoriesWithProducts() {
		this.categoryService.getCategoriesWithProducts()
			.pipe(takeUntil(this.destroy$))
			.subscribe((response => {
				this.categoriesWithProductsList = response.data;
			}));
	}



	addItem() {
		var amount = this.productForm.get('amount')!.value ?? 1
		var createShoppingListItem: CreateShoppingListItem =
			{ amount: amount, productId: this.choosenProduct.id, ShoppingListId: this.shoppingListId };
		this.shoppingListService.AddItem(createShoppingListItem)
			.pipe(takeUntil(this.destroy$))
			.subscribe((response => {
				this.newItemEvent.emit();
				this.productForm.get('productGroup')!.setValue(null)
				this.productForm.get('amount')!.setValue(1)
				this.categoryName = ''
			}));

	}

}
