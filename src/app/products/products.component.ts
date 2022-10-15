import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IProduct} from "../interfaces/product.interface";
import {ProductService} from "../services/product.service";
import {AuthService} from "../services/auth.service";
import {CartService} from "../services/cart.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products$: Observable<IProduct[]> | null = null;

  products: IProduct[] = [];

  constructor(private dataBase: AngularFirestore,
              public authService: AuthService,
              private productService: ProductService,
              private cartService: CartService) {
    this.authService.getUserUid();
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(res => this.products = res);
  }

  buyProduct(product: IProduct) {
    this.cartService.buyProduct(product);
    console.log('bought', product);
  }

  addToCart(product: IProduct) {
    this.cartService.addToCart(product);
    console.log(this.authService.userUid, product);
  }
}
