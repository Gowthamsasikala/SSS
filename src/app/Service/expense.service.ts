import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) { }

  
  addExpense(body: any){
    return this.http.post(environment.httpUrl+"/dailyExpense",body);
   }

   addMyExpense(body: any){
    return this.http.post(environment.httpUrl+"/mydailyExpense",body);
   }

   fetchExpenseRecord(record: any){
    return this.http.post(environment.httpUrl+"/getExpenseByDate",record);
   }

   fetchMyExpenseRecord(record: any){
    return this.http.post(environment.httpUrl+"/myExpenseFetch",record);
   }
}
