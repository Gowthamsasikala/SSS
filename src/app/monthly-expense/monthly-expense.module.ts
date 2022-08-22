import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonthlyExpensePageRoutingModule } from './monthly-expense-routing.module';

import { MonthlyExpensePage } from './monthly-expense.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonthlyExpensePageRoutingModule
  ],
  declarations: [MonthlyExpensePage]
})
export class MonthlyExpensePageModule {}
