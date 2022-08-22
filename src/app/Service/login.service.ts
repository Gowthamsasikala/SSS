import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(body: any){
   return this.http.post(environment.httpUrl+"/login",body);
  }

  signup(body: any){
  return this.http.post(environment.httpUrl+"/signup",body);
  }
}
