import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  items: any[] = [];

  ngOnInit() {
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
  }

  signOut() {
    this.authService.signOut();
  }

}
