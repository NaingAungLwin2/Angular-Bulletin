import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public role = sessionStorage.getItem('userRole')
  data = [];
  isLoadingResults = true;
  constructor(
    
    private userService: UserService
  ) { }
  
  ngOnInit(): void {
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
    console.log('kkkkkk')
    this.userService.getUsers().subscribe((res: any) => {
      this.data = res;
      
      console.log(this.data);
     
      this.isLoadingResults = false;
      this.loggedIn.next(false)
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

}
