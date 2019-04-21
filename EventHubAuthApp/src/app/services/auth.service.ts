import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '../../../node_modules/@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _url = 'http://localhost:3000/api/'
  constructor(private http: HttpClient, private _router: Router) { }
  
  registerUser(user){
    return this.http.post<any>(this._url + 'register', user)
  }
  loginUser(user){
    return this.http.post<any>(this._url + 'login',user)
  }
  loggedIn(){
    return !!localStorage.getItem('token')
  }
  logoutUser(){
    localStorage.removeItem('token')
    this._router.navigate(['/events'])
  }
  getToken(){
    return localStorage.getItem('token')
  }
}
