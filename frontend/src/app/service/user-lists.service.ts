import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:5000/';
@Injectable({
  providedIn: 'root'
})

export class UserListsService {
 
  private apiEndpoint = environment.apiEndpoint;
  private apiPath = 'search'
  constructor(private http:HttpClient) { }
  
getUserLists(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.get(`${environment.apiEndpoint}userlists`);
  }

deleteUser(id: number): Observable<any> {
  return this.http.get(`${environment.apiEndpoint}delete/${id}`);
}
getUserDetail(id:string):Observable<any>{
  return this.http.get(`${environment.apiEndpoint}userdetail/${id}`)
}
searchUser(body:any):Observable<any>{
  return this.http.post(`${environment.apiEndpoint}search`, body)
}



// searchUser(name: string, email: string): Promise<any> {
//   const loginUrl = this.apiEndpoint + this.apiPath;
//   const body = {
//     name : name,
//     email: email,
    
//   };
//   return new Promise((resolve, reject) => {
//     this.http.post(loginUrl, body).subscribe((data: any) => {
//       console.log("HERE", data);
      
//       resolve(data);
//     },
//       error => {
//         reject(error);
//       });
//   });
// }


}
