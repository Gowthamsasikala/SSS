import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddingMenuService {

  constructor(private http: HttpClient) { }

  addMenu(body: any){
   return this.http.post(environment.httpUrl+"/addMenu",body);
  }

  getAllMenuItems(){
   return this.http.get(environment.httpUrl+"/getAllMenu");
  }
}
