import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {IProduct} from "../interfaces/product.interface";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  products: IProduct[] = [];

  display: boolean = false;

  constructor(private productService: ProductService,
              public authService: AuthService) {
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  deleteProduct(product: IProduct) {
    this.productService.deleteProduct(product);
  }

  addProduct(product: IProduct) {
    this.productService.addProduct(product);
  }

  openAddDialog() {
    this.display = true;
  }
}
