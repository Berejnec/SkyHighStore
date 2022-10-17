import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

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
      this.router.navigate(['sign-in']);
      this.messageService.add({
        severity: 'success',
        summary: 'Sign up successful!',
        detail: 'You can now log in!',
        life: 5000
      })
    });
  }

}
