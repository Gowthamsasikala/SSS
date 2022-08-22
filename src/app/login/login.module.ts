import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { LoginPage } from './login.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    BrowserModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
