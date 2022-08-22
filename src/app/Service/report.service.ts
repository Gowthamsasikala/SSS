import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  fetchBillingRecord(body: any){
    return this.http.post(environment.httpUrl+"billingRecordByDate",body);
   }

   dailySalesProfit(body: any){
    return this.http.post(environment.httpUrl+"dailySaleProfit",body);
   }

   fetchDailySalesProfit(body: any){
    return this.http.post(environment.httpUrl+"fetchDailySaleProfit",body);

   }
}
