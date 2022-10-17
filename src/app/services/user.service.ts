import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc, docData,
  Firestore,
  setDoc,
  updateDoc
} from "@angular/fire/firestore";
import {IUser} from "../interfaces/user.interface";
import {IProduct} from "../interfaces/product.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  products: Observable<IUser[]> | null = null;

  constructor(public fireStore: Firestore) {
  }

  addUser(user: IUser) {
    const usersRef = collection(this.fireStore, 'users');
    return addDoc(usersRef, user);
  }

  getUsers(): Observable<IUser[]> {
    const usersRef = collection(this.fireStore, 'users');
    return collectionData(usersRef, {idField: 'id'}) as Observable<IUser[]>;
  }

  deleteUser(user: IUser) {
    const userDocRef = doc(this.fireStore, `users/${user.uid}`);
    return deleteDoc(userDocRef);
  }

  updateUser(user: IUser) {
    const userDocRef = doc(this.fireStore, `users/${user.uid}`);
    return setDoc(userDocRef, user);
  }

  updateUserRole(user: IUser, role: string) {
    const userDocRef = doc(this.fireStore, `users/${user.uid}`);
    return updateDoc(userDocRef, { role: role});
  }

  getUserById(id: string) {
    const userRef = doc(this.fireStore, `users/${id}`);
    return docData(userRef, { idField: 'uid'}) as Observable<IUser>;
  }
}
