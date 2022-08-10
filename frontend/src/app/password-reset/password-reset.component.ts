import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl} from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { LoginAuthService } from '../service/login.service';
import { User } from '../models';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  UserForm !: FormGroup;
  hide = true;
  public users: User[] = [];
  public pw: any = ''

  constructor(private routes:Router,private userService:UserService) {  

    this.UserForm= new FormGroup({
      password: new FormControl([
        Validators.required,
        Validators.pattern,
      ]),
      conpassword: new FormControl(null,[
        Validators.required,
      ]),
  })
}
get password(){
  return this.UserForm.get('password')
}
get conpassword(){
  return this.UserForm.get('conpassword')
}
  userpassword = sessionStorage.getItem('password')
  passwordupdate(){
    const user = {
      id : sessionStorage.getItem('editid'),
      password: this.UserForm.value.password,
    };
      this.userService.passwordrest(user).subscribe((data) => {
      this.users.unshift(data);
      this.routes.navigateByUrl('edit-user')
    }, error => {
      console.log('ERROR :: ', error);
    });
  }
  ngOnInit(): void {
  }
}
