import {Component, OnInit} from '@angular/core';
import {CartService} from "../services/cart.service";
import {Observable} from "rxjs";
import {IProduct} from "../interfaces/product.interface";
import {AuthService} from "../services/auth.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartProducts$: Observable<IProduct[]> | null = null;

  cart: { price: string; id: string; productName: string }[] = [];

  displayPlaceOrder: boolean = false;

  constructor(private cartService: CartService,
              private auth: AuthService,
              private messageService: MessageService,
              private router: Router) {
    this.auth.getUserUid();
  }

  ngOnInit(): void {
    // this.cartProducts$ = this.cartService.getCartProducts();
    this.cartService.getCart().subscribe(cart => {
      this.cart = cart.map((shopCart) => {
        const data = shopCart.payload.doc.data() as IProduct;
        return {
          id: shopCart.payload.doc.id,
          productName: data.productName,
          price: data.price,
        }
      })
    })
    console.log(this.auth.userUid);
    // this.auth.getUserUid();
    // let uid = this.auth.userUid;
    // console.log(uid);
  }

  placeOrder() {
    this.displayPlaceOrder = true;
  }


  closeOrderDialog() {
    this.displayPlaceOrder = false;
  }

  confirmOrder() {
    this.messageService.add({
      severity: 'success',
      summary: 'Your order has been registered!',
      detail: 'Thank you for choosing us!',
      life: 5000
    })
    this.displayPlaceOrder = false;
    setTimeout(() => {
      this.router.navigate(['products']);
    }, 1500);
  }
}
