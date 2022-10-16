import {Injectable, NgZone} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {IUser} from "../interfaces/user.interface";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  public userUid: string | undefined | null = null;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private messageService: MessageService
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    })
  }

  signUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then((result) => {
      this.setUserData(result.user);
      console.log('signed up successfully');
    })
  }

  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password).then((result) => {
      this.setUserData(result.user);
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          this.router.navigate(['products']);
          this.onSuccessSignIn();
        }
      })
    })
      .catch((error) => {
        this.onFailedSignIn();
        console.log(error);
      })
  }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<IUser> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: IUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      joinDate: new Date()
    };

    return userRef.set(userData, {merge: true});
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  getUserUid() {
    this.afAuth.authState.subscribe(data => this.userUid = data?.uid);
  }

  onSuccessSignIn() {
    this.messageService.add({
      severity: 'success',
      summary: 'Log in successful',
      detail: 'Enjoy our products!',
      life: 4000
    });
  }

  onFailedSignIn() {
    this.messageService.add({
      severity: 'error',
      summary: 'Sign-in failed',
      detail: 'Verify your credentials and try again!',
      life: 4000
    });
  }

}
