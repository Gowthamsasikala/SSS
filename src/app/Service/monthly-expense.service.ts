import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonthlyExpenseService {

  constructor(private http: HttpClient) { }

  addMonthlyExpense(body: any){
    return this.http.post(environment.httpUrl+"monthlyExpense",body);
   }

   fetchMonthlyExpense(body: any){
    return this.http.post(environment.httpUrl+"monthlyExpenseFetch",body);
   }
}
