import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddingMenuPage } from '../adding-menu/adding-menu.page';
import { BillingPage } from '../billing/billing.page';
import { DailyExpensePage } from '../daily-expense/daily-expense.page';
import { DashboardPage } from '../dashboard/dashboard.page';
import { ExpensePage } from '../expense/expense.page';
import { FootbarPage } from '../footbar/footbar.page';
import { LoginPage } from '../login/login.page';
import { MonthlyExpensePage } from '../monthly-expense/monthly-expense.page';
import { MyexpensePage } from '../myexpense/myexpense.page';
import { ReportPage } from '../report/report.page';
import { SaleAndProfitPage } from '../sale-and-profit/sale-and-profit.page';

import { FolderPage } from './folder.page';

const routes: Routes = [
  {
    path: '',
    component: FolderPage,
    children :[ 
      {
        path: 'dashboard',
        component :DashboardPage
      },
      {
        path: 'login',
        component :LoginPage
      },
      {
        path: 'adding-menu',
        component : AddingMenuPage
      },
      {
        path: 'billing',
        component : BillingPage
      },
      {
        path: 'report',
        component : ReportPage
      },
      {
       path :'daily-expense',
       component : DailyExpensePage 
      },
      {
        path:'expense',
        component : ExpensePage
      },
      {
        path:'monthly-expense',
        component : MonthlyExpensePage
      },
      {
        path:'sale-and-profit',
        component : SaleAndProfitPage
      },
      {
        path : 'myexpense',
        component : MyexpensePage
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
