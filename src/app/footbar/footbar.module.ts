import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FootbarPageRoutingModule } from './footbar-routing.module';

import { FootbarPage } from './footbar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FootbarPageRoutingModule
  ],
  declarations: [FootbarPage]
})
export class FootbarPageModule {}
