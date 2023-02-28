import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCategoryComponent } from '@components/create-category/create-category.component';
import { CreateProductComponent } from '@components/create-product/create-product.component';
import { CreateListComponent } from '@components/create-list/create-list.component';
import { HomeComponent } from '@components/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'create-category', component: CreateCategoryComponent},
  { path: 'create-item', component: CreateProductComponent },
  { path: 'create-list', component: CreateListComponent },
  { path: 'create-list/:id', component: CreateListComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
