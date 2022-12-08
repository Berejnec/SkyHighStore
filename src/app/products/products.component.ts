import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IProduct} from "../interfaces/product.interface";
import {ProductService} from "../services/product.service";
import {AuthService} from "../services/auth.service";
import {CartService} from "../services/cart.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

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
              private messageService: MessageService,
              private router: Router,
              private cartService: CartService) {
    this.authService.getUserUid();
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(res => this.products = res);
  }

  buyProduct(product: IProduct) {
    this.cartService.buyProduct(product);
  }

  addToCart(product: IProduct) {
    this.cartService.addToCart(product).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Product added!',
        detail: 'Your desired product was added to your shopping cart.',
        life: 4000
      })
    })
  }

  goToPromoPage() {
    this.router.navigate(['promo'])
  }
}
