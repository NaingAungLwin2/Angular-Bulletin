import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, } from '@angular/forms';
import { CsvServiceService } from '../service/csv-service.service';
import { Validators } from '@angular/forms';
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
    if(this.file){
      this.havefile = true;
    }
    console.log(this.file)
}
  // UserForm !:FormGroup
  constructor(private fileupload : CsvServiceService, private router:Router) { }

  ngOnInit(): void {
    // this.createForm();
  }
  // createForm(){
  //   this.UserForm = this.fg.group
  //   ({ csvupload : ['',Validators.required]
  //   })
   
  // }
  
  // upload(){
  //   let form_data = new FormData();
  //   form_data.append('file', this.UserForm.value.csvupload);
  //   console.log(form_data)
  //   // return this.csvService.csvupload(body:any).subscribe((data) => {
      
  // }
  usersid = sessionStorage.getItem('userId')
  onUpload() {
    if(this.havefile){
      this.loading = !this.loading;
      console.log(this.file);
      this.fileupload.upload(this.file).subscribe(
          (event: any) => {
            
            if (event == '1') {
              alert('One of the titles is already exist.')
              this.router.navigateByUrl('csvupload');
              }
            else {
              console.log(event)
              this.router.navigateByUrl('post_lists');
            }
  
                  
                  
              }
          
      );  
    }
    else{
        alert('There is no file selected')
    }
   
}
  

}
