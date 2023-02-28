import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CategoriesWithProductsComponent } from '@components/shared/categories-with-products/categories-with-products.component';
import { Category } from 'app/models/category';
import { Product } from 'app/models/product';
import { CategoryService } from 'app/services/category/category.service';
import { ProductService } from 'app/services/product/product.service';
import { OperatorFunction, Observable, debounceTime, distinctUntilChanged, map, Subject, takeUntil } from 'rxjs';


@Component({
	selector: 'app-create-product',
	templateUrl: './create-product.component.html',
	styleUrls: ['./create-product.component.less']
})
export class CreateProductComponent {

	destroy$: Subject<boolean> = new Subject<boolean>();
	categoryList: Array<Category> = [];
	productName: string = "";
	categoryModel: any;

	formatter = (x: { name: string }) => x.name;

	@ViewChild(CategoriesWithProductsComponent) updateCategoryList!:CategoriesWithProductsComponent;

	constructor(private categoryService: CategoryService, private productService: ProductService) {
	}

	ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.unsubscribe(); 
		}
	
	  ngOnInit() {
		this.getCategories();
	  }
	

	search: OperatorFunction<string, readonly Category[]> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(200),
			distinctUntilChanged(),
			map((term) =>
				term === '' ? [] : this.categoryList.filter((v) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
			),
		);
	
		
	getCategories() {
		this.categoryService.getCategories()
			.pipe(takeUntil(this.destroy$))
			.subscribe((response => {
				this.categoryList = response.data;
			}));
	}

	addProduct() {
		var product: Product = {id: "", name: this.productName, categoryId: this.categoryModel.id}
		this.productService.addProduct(product)
			.pipe(takeUntil(this.destroy$))
			.subscribe((response => {
				this.updateCategoryList.getCategoriesWithProducts();
			}));

	}

}
