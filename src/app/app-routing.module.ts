import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash-screen',
    pathMatch: 'full'
  },
  {
    path: 'folder', 
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'splash-screen',
    loadChildren: () => import('./splash-screen/splash-screen.module').then( m => m.SplashScreenPageModule)
  },
  {
    path: 'billing',
    loadChildren: () => import('./billing/billing.module').then( m => m.BillingPageModule)
  },
  {
    path: 'daily-expense',
    loadChildren: () => import('./daily-expense/daily-expense.module').then( m => m.DailyExpensePageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'footbar',
    loadChildren: () => import('./footbar/footbar.module').then( m => m.FootbarPageModule)
  },
  {
    path: 'adding-menu',
    loadChildren: () => import('./adding-menu/adding-menu.module').then( m => m.AddingMenuPageModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./report/report.module').then( m => m.ReportPageModule)
  },
  {
    path: 'sale-and-profit',
    loadChildren: () => import('./sale-and-profit/sale-and-profit.module').then( m => m.SaleAndProfitPageModule)
  },
  {
    path: 'expense',
    loadChildren: () => import('./expense/expense.module').then( m => m.ExpensePageModule)
  },
  {
    path: 'monthly-expense',
    loadChildren: () => import('./monthly-expense/monthly-expense.module').then( m => m.MonthlyExpensePageModule)
  },
  {
    path: 'myexpense',
    loadChildren: () => import('./myexpense/myexpense.module').then( m => m.MyexpensePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}


