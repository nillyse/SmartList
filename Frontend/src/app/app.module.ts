import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from '@components/home/home.component';
import { NgbAlert, NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateListComponent } from '@components/create-list/create-list.component';
import { CreateCategoryComponent } from '@components/create-category/create-category.component';
import { CreateProductComponent } from '@components/create-product/create-product.component';
import { HeaderComponent } from '@components/header/header.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from './services/category/category.service';
import { ProductService } from './services/product/product.service';
import { CategoriesWithProductsComponent } from './components/shared/categories-with-products/categories-with-products.component';
import { ToogleClassDirective } from './directives/toogle-class.directive';
import { ShoppingListService } from './services/shopping-list/shopping-list.service';
import { ShoppingItemsFromCategoryTileComponent } from './components/create-list/shopping-items-from-category-tile/shopping-items-from-category-tile.component';
import { CreateItemComponent } from '@components/create-list/create-item/create-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from "@angular/material/expansion";
import { DragDropModule } from "@angular/cdk/drag-drop";
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatSelectModule} from '@angular/material/select'; 
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort'; 
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';
import { ShoppingListTileGroupComponent } from './components/shopping-list-tile-group/shopping-list-tile-group.component';
import { ShoppingListTileComponent } from './components/shopping-list-tile-group/shopping-list-tile/shopping-list-tile.component'; 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateListComponent,
    CreateCategoryComponent,
    CreateProductComponent,
    HeaderComponent,
    CategoriesWithProductsComponent,
    ToogleClassDirective,
    ShoppingItemsFromCategoryTileComponent,
    CreateItemComponent,
    ShoppingListTileGroupComponent,
    ShoppingListTileComponent
  ],
  imports: [ 
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    NgbAlert,
    NgbToastModule,
    BrowserAnimationsModule,
    MatExpansionModule, 
    DragDropModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatMenuModule,
    MatGridListModule
  ],
  providers: [CategoryService, ProductService, ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
