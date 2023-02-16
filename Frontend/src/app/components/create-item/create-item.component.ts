import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from 'app/models/category';
import { Product } from 'app/models/product';
import { CategoryService } from 'app/services/category/category.service';
import { ProductService } from 'app/services/product/product.service';
import { OperatorFunction, Observable, debounceTime, distinctUntilChanged, map, Subject, takeUntil } from 'rxjs';


@Component({
	selector: 'app-create-item',
	templateUrl: './create-item.component.html',
	styleUrls: ['./create-item.component.less']
})
export class CreateItemComponent {

	destroy$: Subject<boolean> = new Subject<boolean>();
	@Output() categoryList: Array<Category> = [];
	productName: string = "";
	@Output() public categoryModel: any;

	@Input() public inputTest: any;


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
	
		formatter = (x: { name: string }) => x.name;
		
	getCategories() {
		this.categoryService.getCategories()
			.pipe(takeUntil(this.destroy$))
			.subscribe((response => {
				this.categoryList = response.data;
			}));
	}

	addProduct() {
		console.log(this.categoryModel)
		var product: Product = {id: "", name: this.productName, categoryId: this.categoryModel.id}
		this.productService.addProduct(product)
			.pipe(takeUntil(this.destroy$))
			.subscribe((response => {
			}));

	}

	changeInputValue() {
		this.inputTest = "nowa wartosc"
	}

}
