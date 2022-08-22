import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddingMenuPageRoutingModule } from './adding-menu-routing.module';

import { AddingMenuPage } from './adding-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddingMenuPageRoutingModule
  ],
  declarations: [AddingMenuPage]
})
export class AddingMenuPageModule {}
