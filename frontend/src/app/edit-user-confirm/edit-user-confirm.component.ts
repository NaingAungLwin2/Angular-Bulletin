import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from 'model';
import { Router } from '@angular/router';
import { ParamDataService } from '../service/param-data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-user-confirm',
  templateUrl: './edit-user-confirm.component.html',
  styleUrls: ['./edit-user-confirm.component.css']
})
export class EditUserConfirmComponent implements OnInit {
  public profile : any;
  public users: User[] = [];
  

  constructor(private userService:UserService,private route:Router,private paramDataSvc:ParamDataService) { }


  username = sessionStorage.getItem('name')
  useremail = sessionStorage.getItem('email')
  userdob = sessionStorage.getItem('dob')
  useraddress = sessionStorage.getItem('address')
  userphone = sessionStorage.getItem('phone')
  usertype = sessionStorage.getItem('type')
  userid = sessionStorage.getItem('userId')
  url = sessionStorage.getItem('url')
  
  ngOnInit(): void {
  }
  

  userupdate(){
    if(this.paramDataSvc.partnerData){
      this.profile = this.paramDataSvc.partnerData
    }
    else{
      this.profile = '';

    }
    const user = {
      id : sessionStorage.getItem('editid'),
      name: this.username,
      email: this.useremail,
      dob:this.userdob,
      
      phone:this.userphone,
      address:this.useraddress,
     
      type:this.usertype,
      ownerid:this.userid,
      profile:this.profile
     
    };
    
      this.userService.updateUser(user).subscribe((data) => {
       
        
        this.users.unshift(data);
        console.log(data)
        sessionStorage.removeItem('url')
        this.route.navigateByUrl('dashboard')
    }, error => {
      console.log('ERROR :: ', error);
    });
  
  
  
  }
  
  

}
