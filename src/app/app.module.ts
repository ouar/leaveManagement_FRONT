import { BasicAuthInterceptor } from './shared/security/interceptor/basic/basic-auth-interceptor';
import { ErrorInterceptor } from './shared/security/interceptor/error/error-interceptor';
import { JwtInterceptor } from './shared/security/interceptor/jwt/jwt-interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientXsrfModule } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { CongesComponent } from './component/conges/conges.component';
import { MessageComponent } from './component/message/message.component';
import { CreateCollaborateurComponent } from './component/collabs/create-collaborateur/create-collaborateur.component';
import { ListeCollaborateurComponent } from './component/collabs/liste-collaborateur/liste-collaborateur.component';
import { UsersListComponent } from './component/users/users-list/users-list.component';
import { CreateUserComponent } from './component/users/create-user/create-user.component';
import { HeaderComponent } from './component/header/header.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';



@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [AppComponent, LoginComponent, HomeComponent, CongesComponent, MessageComponent, CreateCollaborateurComponent, ListeCollaborateurComponent, UsersListComponent, CreateUserComponent, HeaderComponent, SidebarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule,
    HttpClientXsrfModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    MessageComponent
  ]
})
export class AppModule {}
