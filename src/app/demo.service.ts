import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product.interface';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  constructor(private http: HttpClient) { }

  readonly URL = 'http://localhost:46170';

  async getAllProductDetails() {
    const res = await this.http.get(this.URL + '/getAllProducts').toPromise()
    .then(res => res );
    return res;
  }

  async addProductDetails(product: Product) {
    const res = await this.http.post(this.URL + '/addProduct', product).toPromise()
      .then(res => res = res);
    return res;
  }

}
