import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from 'app/models/category';
import { CategoryService } from 'app/services/category/category.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-categories-with-products',
  templateUrl: './categories-with-products.component.html',
  styleUrls: ['./categories-with-products.component.less']
})
export class CategoriesWithProductsComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  categoryList: Array<Category> = [];
  @Output() categoryListEmitter: EventEmitter<Array<Category>> = new EventEmitter();


  constructor(private categoryService: CategoryService) {
    
  }

  ngOnInit() {
    this.getCategories()
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

  // refreshEmitCategoryList() {
  //   this.getCategories()
  // }

}
