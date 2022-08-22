import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonthlyExpensePage } from './monthly-expense.page';

const routes: Routes = [
  {
    path: '',
    component: MonthlyExpensePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonthlyExpensePageRoutingModule {}
