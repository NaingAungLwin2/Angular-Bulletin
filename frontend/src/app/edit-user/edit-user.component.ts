import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { LoginAuthService } from '../service/login.service';
import { UserListsService } from '../service/user-lists.service';
import { ParamDataService } from '../service/param-data.service';
import * as moment from 'moment';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  public isGoodResolution: boolean = false;
  public imagePath: any;
  
  public url: any;
  UserForm !: FormGroup;
  dobdate : string = ''
  nrtype : string = ''
  
  updatedob : string = '';
  public user : any = [];
  date = new Date();
  todaydate = moment(this.date).format('YYYY-MM-DD');

  public prevImagePath : any;
  id = sessionStorage.getItem('editid')!;
  constructor(private routes: Router,private userService:UserService,private UserSvc:UserListsService,private paramDataSvc:ParamDataService) {  
    this.prevImagePath = "../../assets/tmp/"+ this.id + "/" + this.id + ".png";
    
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
      dob: new FormControl(null,[
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
  
  ngOnInit(): void {
    this.getUserDetail(this.id)
  
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

getUserDetail(id:string) {
  this.UserSvc.getUserDetail(id).subscribe(user => {
    this.user = user;
    this.dobdate = moment(this.user.dob).format('YYYY-MM-DD');
   
    if(this.user.type == '1'){
      this.nrtype = '1'
    }
    else{
      this.nrtype = '0'
    }
  },error => {
    console.log('ERROR :: ', error);
  });
}
editUser(){
 
  sessionStorage.setItem('name',this.UserForm.value.name);
  sessionStorage.setItem('email',this.UserForm.value.email);
  sessionStorage.setItem('phone',this.UserForm.value.phone);
  sessionStorage.setItem('address',this.UserForm.value.address);
  sessionStorage.setItem('type',this.UserForm.value.type);
  this.updatedob = moment(this.UserForm.value.dob).format('YYYY-MM-DD')
  sessionStorage.setItem('dob',this.updatedob)
  this.checkEmail(this.UserForm.value.email)

}
passwordrest(){
  sessionStorage.getItem('editid');
  sessionStorage.setItem('password',this.user.password)
  this.routes.navigateByUrl('passwordreset')
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
    Img.src = URL.createObjectURL(filesToUpload[0]);
    Img.onload = (e: any) => {
      const height = e.path[0].height;
      const width = e.path[0].width;
      if (width < 1000 && height < 900) {
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
checkEmail(email:string): void {
  this.userService.checkEmailUpdate(email).then(res => {
    if (res) {
    alert('This email is already exist.')
    }
    else {
    this.routes.navigateByUrl('edit-user-confirm');
    }
  }).catch(error => {
    console.log('error ', error);
  });
}

}
