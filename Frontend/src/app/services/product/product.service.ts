import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from 'app/models/category';
import { Response } from 'app/models/response';
import { Product } from 'app/models/product';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {
  }

  baseUrl = 'https://localhost:7185';

  
  getProducts() {
    return this.http.get<Response<Array<Product>>>(this.baseUrl+"/products");
  }

  getProductsFromCategory(category: Category) {
    return this.http.get<Response<Array<Product>>>( `${this.baseUrl}/products/${category.id}`);
  }

  addProduct(product: Product) {
    return this.http.post<Response<string>>(this.baseUrl+"/product", product);
  }

  deleteProduct(productId: string) {
    return this.http.delete<Response<boolean>>(this.baseUrl+"/product", {params: { id: productId}});
  }


}
