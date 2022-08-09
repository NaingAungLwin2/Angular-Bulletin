import { Component, OnInit } from '@angular/core';
import { User } from '../models';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { UserListsService } from '../service/user-lists.service';

@Component({
  selector: 'app-logined-userprofile',
  templateUrl: './logined-userprofile.component.html',
  styleUrls: ['./logined-userprofile.component.css']
})
export class LoginedUserprofileComponent implements OnInit {
  public isEdit = false;
  public users: User[] = [];
  public user : any = [];
  public prevImagePath : any;
  UserForm !: FormGroup;
  username = sessionStorage.getItem('name')
  useremail = sessionStorage.getItem('email')

  useraddress = sessionStorage.getItem('address')
  userphone = sessionStorage.getItem('phone')
  usertype = sessionStorage.getItem('type')
  userdob = sessionStorage.getItem('dob')
  
  userid = sessionStorage.getItem('userid')!
  userId = sessionStorage.getItem('userId')!
 
 
  constructor(private userService:UserService, private router:Router, private userlistservice:UserListsService) { 
    this.prevImagePath = "../../assets/tmp/"+ this.userId + "/" + this.userId + ".png";
  }

  editlogineduser(){
    this.router.navigateByUrl('edit-user')
  }
  canclebtn(){
    this.router.navigateByUrl('dashboard')

  }
 
  
  ngOnInit(): void {
    sessionStorage.setItem('editid',this.userId)
    if (!localStorage.getItem('fool')) { 
      localStorage.setItem('fool', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('fool') 
    }
    sessionStorage.removeItem('photo')

  }

}
