import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyExpensePage } from './daily-expense.page';

const routes: Routes = [
  {
    path: '',
    component: DailyExpensePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyExpensePageRoutingModule {}
