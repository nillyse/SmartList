import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CreateCategoryComponent } from '@components/create-category/create-category.component';
import { Category } from 'app/models/category';
import { Product } from 'app/models/product';
import { CategoryService } from 'app/services/category/category.service';
import { ProductService } from 'app/services/product/product.service';
import { Subject, takeUntil } from 'rxjs';
import { NgbActiveModal, NgbModal, ModalDismissReasons, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-categories-with-products',
  templateUrl: './categories-with-products.component.html',
  styleUrls: ['./categories-with-products.component.less']
})
export class CategoriesWithProductsComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  categoriesWithProductsList: Array<any> = [];
  // @ViewChild(CreateCategoryComponent) updateCategoryList!:CreateCategoryComponent;
	closeResult = '';
  typeToDelete: string = '';
  nameToDelete: string = '';
  showModal: boolean = true;
  constructor(private categoryService: CategoryService, private productService: ProductService, private modalService: NgbModal) {
    
  }


  open(content: any, deleteCategoryOrProduct: Function, categoryOrProduct: Category | Product, typeToDelete: "kategorie" | "produkt") {
    if(!this.showModal) {

      return;
    }
    this.typeToDelete = typeToDelete;
    this.nameToDelete = categoryOrProduct.name;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
        console.log(result)
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

  ngOnInit() {
    this.getCategoriesWithProducts();
  }

  deleteCategory(category : Category) {
    this.categoryService.deleteCategory(category.id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response => {
      this.getCategoriesWithProducts();
    }));
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product.id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response => {
      this.getCategoriesWithProducts();
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

}
