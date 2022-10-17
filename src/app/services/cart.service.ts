import { Injectable } from '@angular/core';
import {IProduct} from "../interfaces/product.interface";
import {addDoc, collection, collectionData, deleteDoc, doc, Firestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {user} from "@angular/fire/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(public fireStore: Firestore,
              private angularFirestore: AngularFirestore,
              private authService: AuthService) { }

  addToCart(product: IProduct) {
    return this.angularFirestore.collection(`users/${this.authService.userUid}/cart`).add(product);
  }

  getCart() {
    // return this.angularFirestore.collection(`users/${this.authService.userUid}/cart`).snapshotChanges();
    const cartRef = collection(this.fireStore, `users/${this.authService.userUid}/cart`);
    return collectionData(cartRef, {idField: 'id'}) as Observable<any>;
  }

  buyProduct(product: IProduct) {
    const userUid = this.authService.userUid;
    const cartsRef = collection(this.fireStore, `users/${userUid}/cart`);
    return addDoc(cartsRef, product);
  }

  deleteProduct(product: IProduct) {
    const userUid = this.authService.userUid;
    const productDocRef = doc(this.fireStore, `users/${userUid}/cart/${product.id}`);
    return deleteDoc(productDocRef);
  }

  getCartProducts(): Observable<IProduct[]> {
    const userUid = this.authService.userUid;
    const cartsRef = collection(this.fireStore, `users/${userUid}/cart`);
    return collectionData(cartsRef, {idField: 'id'}) as Observable<IProduct[]>;
  }
}
