import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CsvServiceService {
 
  constructor(private http:HttpClient) { }

  upload(file : File):Observable<any> {
  
   
    const formData = new FormData(); 
       
    formData.append("file", file, file.name);
    console.log(formData)
      
    
    return this.http.post(`${environment.apiEndpoint}csvupload`, formData)
}

}
