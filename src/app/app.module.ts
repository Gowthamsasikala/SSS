import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SplashScreenPageModule } from './splash-screen/splash-screen.module';
 import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FolderPageModule } from './folder/folder.module';
import { LoginPageModule } from './login/login.module';
import { BillingPageModule } from './billing/billing.module';
import { ReportPageModule } from './report/report.module';
import { DailyExpensePageModule } from './daily-expense/daily-expense.module';
import { ExpensePageModule } from './expense/expense.module';
import { HttpClientModule } from '@angular/common/http';
import { AddingMenuPageModule } from './adding-menu/adding-menu.module';
import { MonthlyExpensePageModule } from './monthly-expense/monthly-expense.module';
import { SaleAndProfitPageModule } from './sale-and-profit/sale-and-profit.module';
import { MyexpensePageModule } from './myexpense/myexpense.module';
import { DashboardPageModule } from './dashboard/dashboard.module';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,SplashScreenPageModule,DashboardPageModule,MyexpensePageModule,SaleAndProfitPageModule,MonthlyExpensePageModule,FolderPageModule,HttpClientModule,LoginPageModule,AddingMenuPageModule,CommonModule,BillingPageModule,ReportPageModule,DailyExpensePageModule,ExpensePageModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
