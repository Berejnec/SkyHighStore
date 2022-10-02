import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IProduct} from "../interfaces/product.interface";
import {ProductService} from "../services/product.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products$: Observable<IProduct[]> | null = null;

  constructor(private dataBase: AngularFirestore,
              public authService: AuthService,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
  }

  onSubmit() {

  }
}
