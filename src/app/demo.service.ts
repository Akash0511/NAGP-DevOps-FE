import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product.interface';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  constructor(private http: HttpClient) { }

  readonly URL = 'http://34.172.51.72:80';

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
