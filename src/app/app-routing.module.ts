import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {AppComponent} from "./app.component";
import {AdminComponent} from "./admin/admin.component";
import {CartComponent} from "./cart/cart.component";
import {AdminUsersComponent} from "./admin/admin-users/admin-users.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {AboutComponent} from "./about/about.component";
import {PromoComponent} from "./promo/promo.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'sign-in'},
  {path: 'products', component: ProductsComponent},
  {
    path: 'admin',
    children: [
      {path: 'products', component: AdminComponent},
      {path: 'users', component: AdminUsersComponent}
    ]
  },
  {path: 'cart', component: CartComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'about', component: AboutComponent},
  {path: 'promo', component: PromoComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
