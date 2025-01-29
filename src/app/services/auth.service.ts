import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs'

const httpOptions={
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api_url:string='http://localhost:8000/'

  constructor(private http:HttpClient) { }

  login(username:string, password: string){
    return this.http.post<any>(this.api_url + `accounts/api/auth/`,{username,password}, httpOptions).pipe(
      map(user=>{
        if (user && user.token){
          localStorage.setItem("currentUser", JSON.stringify(user))
          console.log(`${user} logged in`);
        }
        return user
      })
    )

  }

  logout(){
    localStorage.removeItem('currentUser')
    console.log(`Logout`);
  }

}
