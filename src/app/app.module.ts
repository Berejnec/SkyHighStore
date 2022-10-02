import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {environment} from '../environments/environment';

import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import {HttpClientModule} from "@angular/common/http";
import {ProductsComponent} from './products/products.component';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {NavbarComponent} from './navbar/navbar.component';
import {MenubarModule} from "primeng/menubar";
import {ToolbarModule} from "primeng/toolbar";
import {AdminComponent} from './admin/admin.component';
import {CartComponent} from './cart/cart.component';
import {CardModule} from "primeng/card";
import {FileUploadModule} from "primeng/fileupload";
import {SkeletonModule} from "primeng/skeleton";
import {TableModule} from "primeng/table";
import {ProductService} from "./services/product.service";
import {FIREBASE_OPTIONS} from '@angular/fire/compat';
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {DialogModule} from "primeng/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AdminUsersComponent} from './admin/admin-users/admin-users.component';
import {AuthService} from "./services/auth.service";
import {SignUpComponent} from './sign-up/sign-up.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {NotFoundComponent} from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    NavbarComponent,
    AdminComponent,
    CartComponent,
    AdminUsersComponent,
    SignUpComponent,
    SignInComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    AngularFirestoreModule,
    ButtonModule,
    InputTextModule,
    MenubarModule,
    ToolbarModule,
    CardModule,
    FileUploadModule,
    SkeletonModule,
    TableModule,
    DialogModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
