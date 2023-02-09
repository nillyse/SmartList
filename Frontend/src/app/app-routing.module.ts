import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCategoryComponent } from '@components/create-category/create-category.component';
import { CreateItemComponent } from '@components/create-item/create-item.component';
import { CreateListComponent } from '@components/create-list/create-list.component';
import { HomeComponent } from '@components/home/home.component';

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
