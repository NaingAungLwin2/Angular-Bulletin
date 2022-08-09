import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }

  getPostLists(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.get(`${environment.apiEndpoint}postlists`);
  }
  deleteUser(id: number): Observable<any> {
    return this.http.get(`${environment.apiEndpoint}postdelete/${id}`);
  }
  postCreate(body : any):Observable<any> {
    return this.http.post(`${environment.apiEndpoint}postcreate`, body);;

  }
  postUpdate(body:any):Observable<any>{
    return this.http.put(`${environment.apiEndpoint}postupdate`,body)
  }
  getPostDetail(id:string):Observable<any>{
    return this.http.get(`${environment.apiEndpoint}postdetail/${id}`)
  }
  searchPost(body:any):Observable<any>{
    return this.http.post(`${environment.apiEndpoint}searchpost`, body)
  }
  downloadcsv():Observable<any>{
    return this.http.get(`${environment.apiEndpoint}downloadcsv`)
  }
  checkPost(title: string): Promise<any> {
    const body = {
      title: title,
      isUpdate: false,
      updateId: sessionStorage.getItem('editpostid')
      
      
    };
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiEndpoint}checkpost`, body).subscribe((data: any) => {
        console.log("HERE", data);
       
        resolve(data);
      },
        error => {
          reject(error);
        });
    });
  }

  checkPostUpdate(title: string): Promise<any> {
    const body = {
      title: title,
      isUpdate: true,
      updateId: sessionStorage.getItem('editpostid')
      
    };
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiEndpoint}checkpost`, body).subscribe((data: any) => {
        console.log("HERE", data);
        resolve(data);
      },
        error => {
          reject(error);
        });
    });
  }
  
}
