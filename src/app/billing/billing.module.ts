import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { BillingPageRoutingModule } from './billing-routing.module';
import { BillingPage } from './billing.page';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillingPageRoutingModule,
    BrowserModule
  ],
  declarations: [BillingPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class BillingPageModule {}
