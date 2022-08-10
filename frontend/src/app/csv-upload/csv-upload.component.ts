import { Component, OnInit } from '@angular/core';
import { CsvServiceService } from '../service/csv-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-csv-upload',
  templateUrl: './csv-upload.component.html',
  styleUrls: ['./csv-upload.component.css']
})
export class CsvUploadComponent implements OnInit {
  file !: File;
  havefile : boolean = false;
  loading: boolean = false;
  onChange(event : any) {
    this.file = event.target.files[0];
    var splitted = this.file.name.split(".");
    console.log('the file is :::', typeof(splitted[1]))
    if(splitted[1]!= 'csv' && splitted[1]!= 'txt'){
    alert('This is not an csv.')
    location.reload()
    }
    if(this.file){
    this.havefile = true;
    }
    
}
  
  constructor(private fileupload : CsvServiceService, private router:Router) { }

  ngOnInit(): void {
    
  }
  
  usersid = sessionStorage.getItem('userId')
  onUpload() {
    if(this.havefile){
      this.loading = !this.loading;
      
      this.fileupload.upload(this.file).subscribe(
          (event: any) => {
            if (event == '1') {
              alert('One of the titles is already exist.')
              this.router.navigateByUrl('csvupload');
            }
            else{
              console.log(event)
              this.router.navigateByUrl('post_lists');
            }
          });  
      }
    else{
        alert('There is no file selected')
    }
  }
}
