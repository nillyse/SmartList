import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from '@components/home/home.component';
import { NgbAlert, NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateListComponent } from '@components/create-list/create-list.component';
import { CreateCategoryComponent } from '@components/create-category/create-category.component';
import { CreateItemComponent } from '@components/create-item/create-item.component';
import { HeaderComponent } from '@components/header/header.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from './services/category/category.service';
import { ProductService } from './services/product/product.service';
import { CategoriesWithProductsComponent } from './components/shared/categories-with-products/categories-with-products.component';
import { ToogleClassDirective } from './directives/toogle-class.directive';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateListComponent,
    CreateCategoryComponent,
    CreateItemComponent,
    HeaderComponent,
    CategoriesWithProductsComponent,
    ToogleClassDirective
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
  providers: [CategoryService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
