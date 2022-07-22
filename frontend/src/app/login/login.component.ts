import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { LoginAuthService } from '../service/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data = [];
  logindata = [];
  hide = true;
  isLoadingResults = true;
  loginForm !: FormGroup;
  personEmail !: string;
  personPassword !: string;
  userid = '1';
  constructor(private fg: FormBuilder,private router: Router,private userService:UserService,private loginService : LoginAuthService) {
  this.createForm();
  localStorage.clear();
  }

 
createForm(){
    this.loginForm = this.fg.group({ email : ['', Validators.required], password : ['', Validators.required]})
   
}

login(): void {
    // this.loginService.logout();
    // localStorage.setItem('token', 'thisisjusttoken')
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).then(res => {
      if (res) {
        console.log("Login Success");
        this.router.navigateByUrl('users');
      }
    }).catch(error => {
      console.log('error ', error);
      // this.authFailureMessage = this.clientMsg.APPLICATION_ERROR.AUTH;
    });
  }
  

ngOnInit(): void {

  this.userService.getUsers().subscribe((res: any) => {
    this.logindata = res;
    console.log(this.logindata);
    this.isLoadingResults = false;
  }, err => {
    console.log(err);
    this.isLoadingResults = false;
  });
}

}
