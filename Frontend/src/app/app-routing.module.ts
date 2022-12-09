import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CreateItemComponent } from './create-item/create-item.component';
import { CreateListComponent } from './create-list/create-list.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'create-category', component: CreateCategoryComponent},
  { path: 'create-item', component: CreateItemComponent },
  { path: 'create-list', component: CreateListComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
