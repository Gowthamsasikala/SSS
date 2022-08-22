import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddingMenuPage } from './adding-menu.page';

const routes: Routes = [
  {
    path: '',
    component: AddingMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddingMenuPageRoutingModule {}
