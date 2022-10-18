import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  auth = getAuth();

  uid: string = '';

  role: string = '';

  email: string = '';

  tooltipMessage: string = '';

  constructor(public authService: AuthService,
              private userService: UserService) {
  }

  items: any[] = [];

  ngOnInit() {

    onAuthStateChanged(this.auth, (user) => {
      if(user) {
        this.uid = user.uid;
        this.userService.getUserById(user.uid).subscribe(res => {
          if(res.role) {
            this.role = res.role;
            this.tooltipMessage = this.role + ': ';
            this.items[2].visible = this.role === 'Admin';
          }
          if(res.email) {
            this.email = res.email;
            this.tooltipMessage = this.tooltipMessage + ' ' + this.email;
          }
        })
      }

      this.items = [
        {
          label: 'Products',
          icon: 'pi pi-shopping-bag',
          routerLink: ['/products'],
        },
        {
          label: 'Cart',
          icon: 'pi pi-shopping-cart',
          routerLink: ['/cart'],
        },
        {
          label: 'Admin panel',
          icon: 'pi pi-user',
          items: [
            {
              label: 'Toate produsele',
              routerLink: ['/admin/products'],
            },
            {
              label: 'Toti utilizatorii',
              routerLink: ['/admin/users']
            }
          ]
        },
      ];
    })

  }

  signOut() {
    this.authService.signOut();
  }

}
