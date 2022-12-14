import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaleAndProfitPage } from './sale-and-profit.page';

const routes: Routes = [
  {
    path: '',
    component: SaleAndProfitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaleAndProfitPageRoutingModule {}
