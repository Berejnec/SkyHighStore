import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  signIn(email: string, password: string) {
    this.authService.signIn(email, password);
  }

  goToSignUp() {
    this.router.navigate(['/sign-up']);
  }

}
