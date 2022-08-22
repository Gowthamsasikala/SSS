import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FootbarPage } from './footbar.page';

const routes: Routes = [
  {
    path: '',
    component: FootbarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FootbarPageRoutingModule {}
