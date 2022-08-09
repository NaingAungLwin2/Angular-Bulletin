import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { User } from '../models';

import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:5000/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }
  getUser(id: string): Observable<any> {
   
    return this.http.get(`${environment.apiEndpoint}user/${id}`);
  }
  getUsers(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.get(`${environment.apiEndpoint}user`);
  }
  addUser(body: any): Observable<any> {
    return this.http.post(`${environment.apiEndpoint}create`, body);
  }
  
  updateUser(body : any): Observable<any> {
  return this.http.put(`${environment.apiEndpoint}update`,body);
  }
  uploadImage(body: any): Observable<any> {
    return this.http.post(`${environment.apiEndpoint}upload`, body);
  }
  passwordrest(body:any):Observable<any>{
    return this.http.put(`${environment.apiEndpoint}passwordreset`,body);
  }
  checkEmail(mail: string): Promise<any> {
    const body = {
      email: mail,
      isUpdate: false,
      updateId: sessionStorage.getItem('editid')
      
    };
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiEndpoint}checkEmail`, body).subscribe((data: any) => {
        console.log("HERE", data);
        // const user: StrapiUser = data;
        // this.token = user.jwt;
        // this.user = user.user;
        // this.getUserInfo(user);
        resolve(data);
      },
        error => {
          reject(error);
        });
    });
  }
  checkEmailUpdate(mail: string): Promise<any> {
    const body = {
      email: mail,
      isUpdate: true,
      updateId: sessionStorage.getItem('editid')
    };
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiEndpoint}checkEmail`, body).subscribe((data: any) => {
        console.log("HERE", data);
        resolve(data);
      },
        error => {
          reject(error);
        });
    });
  }
  
}
  
  


