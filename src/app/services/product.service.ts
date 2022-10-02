import {Injectable} from '@angular/core';
import {IProduct} from "../interfaces/product.interface";
import {Observable} from "rxjs";
import {addDoc, collection, collectionData, deleteDoc, doc, Firestore, setDoc} from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Observable<IProduct[]> | null = null;

  constructor(public fireStore: Firestore) {
  }

  addProduct(product: IProduct) {
    const productsRef = collection(this.fireStore, 'products');
    return addDoc(productsRef, product);
  }

  getProducts(): Observable<IProduct[]> {
    const productsRef = collection(this.fireStore, 'products');
    return collectionData(productsRef, {idField: 'id'}) as Observable<IProduct[]>;
  }

  deleteProduct(product: IProduct) {
    const productDocRef = doc(this.fireStore, `products/${product.id}`);
    return deleteDoc(productDocRef);
  }

  updateProduct(product: IProduct) {
    const productDocRef = doc(this.fireStore, `products/${product.id}`);
    return setDoc(productDocRef, product);
  }
}
