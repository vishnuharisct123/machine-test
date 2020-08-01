import { LoginResponse } from './../models/login-response.model';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseUrl;
constructor( private httpClient: HttpClient) {
  
 }
 login(loginCredentials : User): Observable<LoginResponse> {
  return this.httpClient.post<LoginResponse>(`${this.baseUrl}/login`, loginCredentials);
}
}
