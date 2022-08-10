import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl} from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { LoginAuthService } from '../service/login.service';
import { User } from '../models';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ParamDataService } from '../service/param-data.service';



@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css'],
  
})
export class UserAddComponent{
  
  
  
  hide = true;
  isLoadingResults = true;
  UserForm !: FormGroup;
 
  model!: NgbDateStruct;
  public formData: FormData = new FormData();
  public file: any;
  public url: any;
  public pw: any = ''
  public updatedob : any = ''
  dobdate : string = ''
  date = new Date();
  todaydate = moment(this.date).format('YYYY-MM-DD');
 
  public isGoodResolution: boolean = false;
  public imagePath: any;
  
  
  public users: User[] = [];
  public user = {
    name: null,
    email: null,
    password : null,
    conpassword:null,
    phone:null,
    address:null,
    dob:null,
    type:null

}
  username = sessionStorage.getItem('name')
  useremail = sessionStorage.getItem('email')
  userpassword = sessionStorage.getItem('password')
  useraddress = sessionStorage.getItem('address')
  userphone = sessionStorage.getItem('phone')
  usertype = sessionStorage.getItem('type')
  userdob = sessionStorage.getItem('dob')
  

  public isEdit = false;
  constructor(private fg: FormBuilder,private routes: Router,private userService:UserService,private loginService : LoginAuthService,private paramDataSvc:ParamDataService) {
    this.UserForm= new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      
      dob: new FormControl([
        Validators.required,
        Validators.pattern
        
      ]),
      password: new FormControl([
        Validators.required,
        Validators.pattern,

        
      ]),

      conpassword: new FormControl(null,[
        Validators.required,
        
       

        
      ]),
      phone: new FormControl(null,[
        Validators.required,
        Validators.pattern("^((\\+95-?)|0)?[0-9]{10}$")
      ]),
      address: new FormControl(null,[
        Validators.required,
       
      ]),
      type: new FormControl(null,[
        Validators.required
      ]),
      
    })
    }


get email(){
return this.UserForm.get('email')!;
}
get name() {
return this.UserForm.get('name');
}

get dob(){
return this.UserForm.get('dob')
}
get address(){
return this.UserForm.get('address')
}
get type(){
return this.UserForm.get('type')
}
get phone(){
return this.UserForm.get('phone')
}
get password(){
  return this.UserForm.get('password')
}
get conpassword(){
  return this.UserForm.get('conpassword')
}
checkEmail(email:string): void {
  this.userService.checkEmail(email).then(res => {
    if (res) {
      
      alert('This email is already exist.')
    }
    else {
      
      this.routes.navigateByUrl('confirm-user');
    }
  }).catch(error => {
    console.log('error ', error);
  });
}
 


addUser(){
  sessionStorage.setItem('name',this.UserForm.value.name);
  sessionStorage.setItem('email',this.UserForm.value.email);
  sessionStorage.setItem('password',this.UserForm.value.password);
  sessionStorage.setItem('phone',this.UserForm.value.phone);
  sessionStorage.setItem('address',this.UserForm.value.address);
  sessionStorage.setItem('type',this.UserForm.value.type);
  
 
  this.updatedob = moment(this.UserForm.value.dob).format('YYYY-MM-DD')
  
  sessionStorage.setItem('dob',this.updatedob)

  this.checkEmail(this.UserForm.value.email)
  

}
onChangeImage(event: any) {
  const URL = window.URL || window.webkitURL;
  const Img = new Image();
  const filesToUpload = (event.target.files);
  var splitted = filesToUpload[0].name.split(".");
    console.log('the file is :::', typeof(splitted[1]))
    if(splitted[1]!= 'png' && splitted[1]!='jpg' && splitted[1]!='jpeg'&& splitted[1]!='gif'){
      alert('Image format is wrong.')
      location.reload()
    }else{
      sessionStorage.setItem('imageDetail', filesToUpload)
  
      const file = filesToUpload[0] as HTMLInputElement;
      Img.src = URL.createObjectURL(filesToUpload[0]);
      Img.onload = (e: any) => {
      const height = e.path[0].height;
      const width = e.path[0].width;
      if ( width < 1000 && height < 900) {
      
      this.isGoodResolution = false;
      this.url = '';
      } else {
      this.isGoodResolution = true;
      var reader = new FileReader();
      this.imagePath = event.target.files;
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.url = reader.result;
        if (this.url) {
          let solution = this.url.split("base64,")[1];
          this.paramDataSvc.partnerData = solution;
          sessionStorage.setItem('url',this.url)
        }
      }
    }
  }

    }
  
}



}
