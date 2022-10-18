import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
export class CartComponent implements OnInit, OnChanges {

  cartProducts$: Observable<IProduct[]> | null = null;

  cart: { price: string; id: string; productName: string }[] = [];

  displayPlaceOrder: boolean = false;

  constructor(private cartService: CartService,
              private auth: AuthService,
              private messageService: MessageService,
              private router: Router) {
    this.auth.getUserUid();
  }

  getTotalCartPrice() {
    let totalPrice: number = 0;
    this.cart.forEach(product => {
      totalPrice = totalPrice + Number(product.price);
    });
    return totalPrice;
  }

  ngOnInit(): void {
    // this.cartProducts$ = this.cartService.getCartProducts();
    // this.cartService.getCart().subscribe(cart => {
    //   this.cart = cart.map((shopCart) => {
    //     const data = shopCart.payload.doc.data() as IProduct;
    //     return {
    //       id: shopCart.payload.doc.id,
    //       productName: data.productName,
    //       price: data.price,
    //     }
    //   })
    // })
    this.auth.getUserUid();
    this.cartService.getCart().subscribe(cart => {
      this.cart = cart;
      this.getTotalCartPrice();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  placeOrder() {
    if(this.cart.length < 1) {
      this.messageService.add({
        severity: 'error',
        summary: 'Cart is empty!',
        detail: 'Add products before you can place the order.',
        life: 5000
      })
    } else {
      this.displayPlaceOrder = true;
    }
  }

  deleteCart() {
    this.cart.forEach(product => {
      this.removeFromCart(product);
    })
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
    this.deleteCart();
  }

  removeFromCart(product: IProduct) {
    this.cartService.deleteProduct(product);
  }
}
