import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyexpensePageRoutingModule } from './myexpense-routing.module';

import { MyexpensePage } from './myexpense.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyexpensePageRoutingModule
  ],
  declarations: [MyexpensePage]
})
export class MyexpensePageModule {}
