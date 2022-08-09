import { Component, OnInit } from '@angular/core';
import { LoginAuthService } from '../service/login.service';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserListsService } from '../service/user-lists.service';

import { BehaviorSubject } from 'rxjs';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as moment from 'moment';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public user : any = [];
  dobdate : string = '';
  id = sessionStorage.getItem('userId')!
  
  public role = sessionStorage.getItem('userRole')
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  logindata = [];
  isLoadingResults = true;
  isLoggedInPage$ !: Observable<boolean>;
  constructor(private loginservice:LoginAuthService,private userService:UserService,private route:Router, private userlist:UserListsService) { 
    sessionStorage.removeItem('url')
  }
  

  
ngOnInit():void{
    
    this.isLoggedInPage$ = this.loginservice.checklogin;
   
    this.userService.getUsers().subscribe((res: any) => {
      this.logindata = res;
      
      
      this.isLoadingResults = true;
      window.location.reload();
      this.loggedIn.next(true)
      
    }, err => {
      console.log(err);
      
      this.isLoadingResults = false;
    });
  }
  logout(){
    this.loginservice.logout();
  }
  logineduser(){
    
    this.profile(this.id)
    

  }
  profile(id:string){
    
    this.userlist.getUserDetail(id).subscribe(user => {
        
    this.user = user;
    console.log(user.name)
    sessionStorage.setItem('name',this.user.name)
    sessionStorage.setItem('email',this.user.email)
    sessionStorage.setItem('type',this.user.type)
    this.dobdate = moment(this.user.dob).format('YYYY-MM-DD')
    sessionStorage.setItem('dob',this.dobdate)
    sessionStorage.setItem('address',this.user.address)
    sessionStorage.setItem('phone',this.user.phone)
    sessionStorage.setItem('editid',this.user.id)    
        
    }, error => {
        console.log('ERROR :: ', error);
    });
    
    this.route.navigateByUrl('loginedprofile')
    
    
  }
  }


