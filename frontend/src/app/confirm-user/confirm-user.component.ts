import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from 'model';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ParamDataService } from '../service/param-data.service';

@Component({
  selector: 'app-confirm-user',
  templateUrl: './confirm-user.component.html',
  styleUrls: ['./confirm-user.component.css']
})
export class ConfirmUserComponent implements OnInit {
  public isEdit = false;
  public users: User[] = [];
  public profile : any;
  
  UserForm !: FormGroup;
  username = sessionStorage.getItem('name')
  useremail = sessionStorage.getItem('email')
  userpassword = sessionStorage.getItem('password')
  useraddress = sessionStorage.getItem('address')
  userphone = sessionStorage.getItem('phone')
  usertype = sessionStorage.getItem('type')
  userdob = sessionStorage.getItem('dob')
  url = sessionStorage.getItem('url');
  imagePath = sessionStorage.getItem('imageDetail');
  usersid = sessionStorage.getItem('userId')

  constructor(private userService:UserService, private router:Router,private paramDataSvc:ParamDataService) { }

  useradd(){
    if(this.paramDataSvc.partnerData){
      this.profile = this.paramDataSvc.partnerData
    }
    else{
      this.profile = '';

    }
    const user = {
      name: this.username,
      email: this.useremail,
      password: this.userpassword,
      dob:this.userdob,
      phone:this.userphone,
      address:this.useraddress,
      ownerid:this.usersid,
      type:this.usertype,
      url:this.url,
      profile:this.profile
      
     
    };
    if(!this.isEdit){
      this.userService.addUser(user).subscribe((data) => {
        this.users.unshift(data);
        console.log(data)
        sessionStorage.removeItem('url')
        this.router.navigateByUrl('userlists')
    }, error => {
      console.log('ERROR :: ', error);
    });
  
  }
  
  }
  cancleuser(){
  this.router.navigateByUrl('user_add')
  }
  

  ngOnInit(): void {
  }

}
