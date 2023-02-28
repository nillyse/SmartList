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
    CreateItemComponent
  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    NgbAlert,
    NgbToastModule
  ],
  providers: [CategoryService, ProductService, ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
