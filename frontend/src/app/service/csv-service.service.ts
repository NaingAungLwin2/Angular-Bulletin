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
  //baseApiUrl = "http://localhost:5000/csvupload"
  constructor(private http:HttpClient) { }

  upload(file : File):Observable<any> {
  
    // Create form data
    const formData = new FormData(); 
      
    // Store form name as "file" with file data
    formData.append("file", file, file.name);
    console.log(formData)
      
    // Make http post request over api
    // with formData as req
    return this.http.post(`${environment.apiEndpoint}csvupload`, formData)
}

}
