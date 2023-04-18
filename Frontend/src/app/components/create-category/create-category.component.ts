import { Component, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Category } from 'app/models/category';
import { CategoryService } from 'app/services/category/category.service';
import { Response } from 'app/models/response';
import { delay, Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { CategoriesWithProductsComponent } from '@components/shared/categories-with-products/categories-with-products.component';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.less']
})
export class CreateCategoryComponent implements OnDestroy {
  categoryName: string = '';
  categoryList: Array<Category> = [];
  alertType: string = '';
  alertMessage: string = '';

  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(CategoriesWithProductsComponent) updateCategoryList!:CategoriesWithProductsComponent;

  constructor(private categoryService: CategoryService) {
  }


  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe(); 
    }

  getCategories() {
    this.categoryService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response => {
        this.categoryList = response.data;
      }));
  }
  
  createCategory() {
    var category: Category = { id: '', name: this.categoryName, products: [] };
    this.categoryService.addCategory(category)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        if (response.success) {
          this.alertType = 'success';
          this.alertMessage = 'Kategoria ' + category.name + " została utworzona!";
        }
        else {
          this.alertType = 'danger';
          this.alertMessage = response.messages[0];
        }
        this.updateCategoryList.getCategoriesWithProducts();
      });
  }

  close() {
    this.alertMessage = ''
  }
}
