import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyexpensePage } from './myexpense.page';

const routes: Routes = [
  {
    path: '',
    component: MyexpensePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyexpensePageRoutingModule {}
