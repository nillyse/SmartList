import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import { Category } from 'app/models/category';
import { Product } from 'app/models/product';
import { CategoryService } from 'app/services/category/category.service';
import { ProductService } from 'app/services/product/product.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-categories-with-products',
  templateUrl: './categories-with-products.component.html',
  styleUrls: ['./categories-with-products.component.less']
})
export class CategoriesWithProductsComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  categoryList: Array<Category> = [];
  categoriesWithProductsList: Array<any> = [];
  productList: Array<Product> = [];
  @Output() categoryListEmitter: EventEmitter<Array<Category>> = new EventEmitter();

  constructor(private categoryService: CategoryService, private productService: ProductService, private renderer: Renderer2, private elem: ElementRef) {
    
  }

  ngOnInit() {
    this.getCategories();
    this.getProducts();
    this.getCategoriesWithProducts();
  }

  deleteCategory(category : Category) {
    this.categoryService.deleteCategory(category)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response => {
      this.getCategories();
    }));

  }

  getCategories() {
    this.categoryService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response => {
        this.categoryList = response.data;
        this.categoryListEmitter.emit(this.categoryList);
      }));
  }

  getCategoriesWithProducts() {
    this.categoryService.getCategoriesWithProducts()
    .pipe(takeUntil(this.destroy$))
    .subscribe((response => {
      this.categoriesWithProductsList = response.data;
      console.log(this.categoriesWithProductsList)
    }));

  }

  getProducts() {
    this.productService.getProducts()
    .pipe(takeUntil(this.destroy$))
    .subscribe((response => {
      this.productList = response.data;
      console.log(this.productList);
    }));
  }

}
