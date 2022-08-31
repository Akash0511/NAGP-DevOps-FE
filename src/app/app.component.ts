import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DemoService } from './demo.service';
import { Product } from './product.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  products: Product[] = [];

  addProductForm!: FormGroup;
  productNameControl!: FormControl;
  quantityControl!: FormControl;
  priceControl!: FormControl;

  constructor(private demoService: DemoService) { }

  ngOnInit(): void {
    this.productNameControl = new FormControl('', [Validators.required]);
    this.quantityControl = new FormControl('', [Validators.required]);
    this.priceControl = new FormControl('', [Validators.required]);

    this.addProductForm = new FormGroup({
      name: this.productNameControl,
      quantity: this.quantityControl,
      price: this.priceControl,
    });

    this.getAllProducts();
  }

  getAllProducts() {
    this.demoService.getAllProductDetails().then((response: any) => {
      this.products = response as Product[]
    }).catch((error) => {
      alert("No Products Found");
    });
  }

  onAddProductSubmit(): void {
    const product: Product = this.addProductForm.value as Product;
    product.quantity = parseInt(product.quantity.toString());
    product.price = parseFloat(product.price.toString());
    this.demoService.addProductDetails(product).then(
      (response: any) => {
        alert("Products detail added successfully.")
        this.getAllProducts();
        this.addProductForm.reset();
      }).catch((error) => {
        alert('Error Adding Product details.');
        this.addProductForm.reset();
      });
  }

  getControlValidationClasses(control: FormControl): any {
    return {
      'is-invalid': control.touched && control.invalid,
      'is-valid': control.touched && control.valid
    };
  }

}
