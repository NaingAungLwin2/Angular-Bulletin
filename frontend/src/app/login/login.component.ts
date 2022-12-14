import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { LoginAuthService } from '../service/login.service';
import { ParamDataService } from '../service/param-data.service';

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
  
  constructor(private fg: FormBuilder,private router: Router,private userService:UserService,private loginService : LoginAuthService,private paradata:ParamDataService) {
  this.createForm();
  sessionStorage.clear();
  this.loginService.logout();
  }

 
createForm(){
    this.loginForm = this.fg.group({ email : ['', Validators.required,Validators.email], 
    password : ['', Validators.required]})
   
}

login(): void {
    
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).then(res => {
      if (res[0]) {
        console.log("Login Success");
        sessionStorage.setItem('userRole', res[1])
        sessionStorage.setItem('userId', res[2])
        let userrole = res[2];
        this.paradata.loginRole = userrole;
        console.log('UserRole is ======>>',this.paradata.loginRole)
        this.router.navigateByUrl('dashboard');
        
      }
      else{
        alert('User Not Found');
      }
    }).catch(error => {
      console.log('error ', error);
    
      alert('User Not Found');
      
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
