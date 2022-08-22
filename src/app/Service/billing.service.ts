import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  constructor(private http: HttpClient) { }

  addBilling(body: any){
    return this.http.post(environment.httpUrl+"/billing",body);
   }

   fetchLastRecords(data: any){
    return this.http.post(environment.httpUrl+"/FetchInsertedRecord",data);
   }
}
