import { AfterContentInit, AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Category } from 'app/models/category';
import { Product } from 'app/models/product';
import { CategoryService } from 'app/services/category/category.service';
import { ProductService } from 'app/services/product/product.service';
import { Subject, takeUntil } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ChangeDetectorRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-categories-with-products',
  templateUrl: './categories-with-products.component.html',
  styleUrls: ['./categories-with-products.component.less'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CategoriesWithProductsComponent {

  destroy$: Subject<boolean> = new Subject<boolean>();
  categoriesWithProductsList: MatTableDataSource<Category> = new MatTableDataSource<Category>();
  itemsList: Category[] = [];
	closeResult = '';
  typeToDelete: string = '';
  nameToDelete: string = '';
  showModal: boolean = true;

  @ViewChild('outerSort', { static: true }) sort!: MatSort;
  @ViewChildren('innerSort') innerSort!: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables!: QueryList<MatTable<Category>>;
  columnsToDisplay = ["name"];
  innerDisplayedColumns = ['name'];
  expandedElement?: Category | null;

  constructor(private categoryService: CategoryService, private productService: ProductService, private modalService: NgbModal, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.getCategoriesWithProducts();
  }

  open(content: any, deleteCategoryOrProduct: Function, categoryOrProduct: Category | Product, typeToDelete: "kategorie" | "produkt") {
    if(!this.showModal) {

      return;
    }
    this.typeToDelete = typeToDelete;
    this.nameToDelete = categoryOrProduct.name;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
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
      response.data.forEach(catWithProds =>
        {
          if(catWithProds.products && Array.isArray(catWithProds.products) && catWithProds.products.length )
            this.itemsList =  [...this.itemsList, {...catWithProds, products: new MatTableDataSource(catWithProds.products)}];
          else {
            this.itemsList = [...this.itemsList, {...catWithProds, products: new MatTableDataSource()}];
          }
        });
      this.categoriesWithProductsList = new MatTableDataSource(this.itemsList);
      this.categoriesWithProductsList.sort = this.sort;
      this.categoriesWithProductsList.sortingDataAccessor = (data: any, sortHeaderId: string) => {
        if (sortHeaderId == 'count') {
          return data.products.data.length
          }
          return data[sortHeaderId as keyof typeof data];
      };
    }));

  }

  toggleRow(element: Category) {
    element.products && (element.products as MatTableDataSource<Product>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Category>).sort = this.innerSort.toArray()[index]);
  }


}
