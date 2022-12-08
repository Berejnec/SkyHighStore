import { Component, OnInit } from '@angular/core';
import {IProduct} from "../interfaces/product.interface";
import {CartService} from "../services/cart.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss']
})
export class PromoComponent implements OnInit {

  products: IProduct[] = [
    {
      productName: 'iPhone 14 Pro',
      price: '1800',
      oldPrice: '1900',
      imageUrl:'https://s13emagst.akamaized.net/products/25344/25343941/images/res_99d57ec9e3d9bb8d3242f384288ce0a3.jpg?width=450&height=450&hash=786B6F02C39C1B12EDCE7B0392025549'
    },

    {
      productName: 'Macbook Pro M1',
      price: '1200',
      oldPrice: '1400',
      imageUrl: 'https://s13emagst.akamaized.net/products/33874/33873196/images/res_2ce18bde5ec79adc307a8d4fc03e40a3.jpg?width=450&height=450&hash=36E0AD827269108B1960B2D568C73060'
    },

    {
      productName: 'Airpods Gen 3',
      price: '200',
      oldPrice: '250',
      imageUrl: 'https://s13emagst.akamaized.net/products/41175/41174338/images/res_976947901dda0b03b0282cab2951cf8b.jpg?width=720&height=720&hash=4E79B0763B578A2A0715D49BB2A285F9'
    },

    {
      productName: 'Laptop Lenovo',
      price: '1199',
      oldPrice: '1399',
      imageUrl: 'https://s13emagst.akamaized.net/products/38277/38276901/images/res_39d5ba539280c46fceddffabc9ea79d9.jpg?width=720&height=720&hash=661893D9D85F14CA25EB10339F625964'
    },

    {
      productName: 'Asus Rog Strix',
      price: '1299',
      oldPrice: '1399',
      imageUrl: 'https://s13emagst.akamaized.net/products/43585/43584527/images/res_31281b1181271b44f410265773a3e158.jpg?width=720&height=720&hash=3F1A5699D439DFA969E51E8EE75DF9FA'
    },

    {
      productName: 'One Plus',
      price: '450',
      oldPrice: '500',
      imageUrl: 'https://s13emagst.akamaized.net/products/31568/31567314/images/res_0fe8353efe5389cd7969484211370f94.jpg?width=720&height=720&hash=0D9EB55F3EE518EDFE1523E2BA1CA159'
    },
    {
      productName: 'Tastatura Razer',
      price: '99',
      oldPrice: '150',
      imageUrl: 'https://s13emagst.akamaized.net/products/31566/31565621/images/res_04be55c67c55ac1d40bc285f0e434cd2.jpg?width=720&height=720&hash=3BD83503568D3E230EFB94B0BAD7566F'
    },
    {
      productName: 'Razer Headphones',
      price: '100',
      oldPrice: '220',
      imageUrl: 'https://s13emagst.akamaized.net/products/31696/31695510/images/res_49a436d4127fcd6cdef5eb9115bb9ae4.jpg?width=720&height=720&hash=D183B81DE558589796233F56338B8E66'
    },

    {
      productName: 'Mouse Microsoft',
      price: '25',
      oldPrice: '35',
      imageUrl: 'https://s13emagst.akamaized.net/products/600/599215/images/res_222e35ef2b03571187a535d2bc35bc94.jpg?width=720&height=720&hash=7F1BD3A0E6D9BC703473172333B91FB9'
    },

    {
      productName: 'Samsung Galaxy S22',
      price: '850',
      oldPrice: '960',
      imageUrl: 'https://s13emagst.akamaized.net/products/43178/43177458/images/res_707ec7b89553b7311534089b62e447e9.jpg?width=720&height=720&hash=48AFB47805668749E7704C8DB1E28501'
    },

  ];
  constructor(private cartService: CartService,
              private messageService: MessageService) { }

  ngOnInit(): void {
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

}
