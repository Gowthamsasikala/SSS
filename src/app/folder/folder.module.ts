import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { FootbarPageModule } from '../footbar/footbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,FootbarPageModule
  ],
  declarations: [FolderPage],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class FolderPageModule {}
