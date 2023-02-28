import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from 'app/models/category';
import { Response } from 'app/models/response';

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient) {
  }

  baseUrl = 'https://localhost:7185';

  getCategories() {
    return this.http.get<Response<Array<Category>>>(this.baseUrl+"/categories");
  }

  getCategory(categoryId: string) {
    return this.http.get<Response<Category>>(`${this.baseUrl}/categories/${categoryId}`);
  }

  getCategoriesWithProducts() {
    return this.http.get<Response<Array<Category>>>(this.baseUrl+"/categoriesWithProducts");
  }

  addCategory(category: Category) {
    return this.http.post<Response<string>>(this.baseUrl+"/category", category);
  }

  deleteCategory(categoryId: string) {
    return this.http.delete<Response<boolean>>(this.baseUrl+"/category", {params: { id: categoryId}});
  }

}
