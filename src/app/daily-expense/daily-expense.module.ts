import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyExpensePageRoutingModule } from './daily-expense-routing.module';

import { DailyExpensePage } from './daily-expense.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyExpensePageRoutingModule
  ],
  declarations: [DailyExpensePage]
})
export class DailyExpensePageModule {}
