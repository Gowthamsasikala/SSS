import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaleAndProfitPageRoutingModule } from './sale-and-profit-routing.module';

import { SaleAndProfitPage } from './sale-and-profit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaleAndProfitPageRoutingModule
  ],
  declarations: [SaleAndProfitPage]
})
export class SaleAndProfitPageModule {}
