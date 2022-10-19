import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  navigateToStore() {
    if(this.authService.isLoggedIn) {
      this.router.navigate(['products']);
    } else {
      this.router.navigate(['sign-in']);
    }
  }
}
