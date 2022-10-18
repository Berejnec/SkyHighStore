import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import firebase from "firebase/compat";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  signUp(email: string, password: string) {
    this.authService.signUp(email, password).then(() => {
      this.router.navigate(['products']);
      this.messageService.add({
        severity: 'success',
        summary: 'Sign up successful!',
        detail: 'Enjoy our shop!',
        life: 5000
      })
    })
      .catch((error: firebase.FirebaseError) => {
        if(error.code==='auth/email-already-in-use') {
          this.messageService.add({
            severity: 'error',
            summary: 'Sign up failed!',
            detail: 'This mail is already in use!',
            life: 5000
          })
        }
        if(error.code==='auth/invalid-email') {
          this.messageService.add({
            severity: 'error',
            summary: 'Sign up failed!',
            detail: 'The mail is badly formatted!',
            life: 5000
          })
        }

      });
  }

  goToLogin() {
    this.router.navigate(['sign-in']);
  }

}
