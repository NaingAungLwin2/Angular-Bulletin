import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  

  private apiPath = 'login';
  private loginToken = "";
  private apiEndpoint = environment.apiEndpoint;


  private currentUserInfo = new BehaviorSubject({});
  public currentUserInfoObservable = this.currentUserInfo.asObservable();

  constructor(
    private http: HttpClient,
    protected router: Router,
  ) {
   
  }

  login(email: string, password: string): Promise<any> {
    const loginUrl = this.apiEndpoint + this.apiPath;
    const body = {
      email: email,
      password: password
    };
    return new Promise((resolve, reject) => {
      this.http.post(loginUrl, body).subscribe((data: any) => {
        console.log("HERE", data);
        
        resolve(data);
      },
        error => {
          reject(error);
        });
    });
  }

  getUserInfo(data: any): void {
    this.currentUserInfo.next(data);
  }

  logout(): any {
    this.clearAll();
    this.loggedIn.next(false);
   
    this.router.navigate(['']);
  }

isLoggedIn() {
    console.log('----- Check LoggedIn -------');
    console.log(sessionStorage.getItem('userRole'));
    if (sessionStorage.getItem('userRole') != null) {
      this.loggedIn.next(true);
      return true;
    } else {
      this.loggedIn.next(false);
      return false;
      
    }
  }
 
  get checklogin() {
    return this.loggedIn.asObservable();
  }

  
  public clearAll(): any {
    this.loginToken = "";
    sessionStorage.clear();
  }

  
  
}