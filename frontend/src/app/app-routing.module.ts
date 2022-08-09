import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LoginGuard } from './auth/login.guard';
import { UserListsComponent } from './user-lists/user-lists.component';
import { UserAddComponent } from './user-add/user-add.component';
import { ConfirmUserComponent } from './confirm-user/confirm-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditUserConfirmComponent } from './edit-user-confirm/edit-user-confirm.component';
import { PostListsComponent } from './post-lists/post-lists.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostCreateConfirmComponent } from './post-create-confirm/post-create-confirm.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostEditConfirmComponent } from './post-edit-confirm/post-edit-confirm.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UsersComponent } from './users/users.component';
import { CsvUploadComponent } from './csv-upload/csv-upload.component';
import { LoginedUserprofileComponent } from './logined-userprofile/logined-userprofile.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { RoleGuard } from './role.guard';


const routes: Routes = [
  
  
  {
    path : 'loginedprofile',
    component:LoginedUserprofileComponent,
    canActivate:[LoginGuard]
  },
  {
     path:'passwordreset',
     component:PasswordResetComponent,
     canActivate:[LoginGuard]
  },

  {
    path: 'dashboard',
    component: UsersComponent,
    data: { title: 'List of User' },
    canActivate:[LoginGuard]
  },
  {
    path:'csvupload',
    component:CsvUploadComponent,
    canActivate:[LoginGuard]
  },
  {
    path: 'userlists',
    component: UserListsComponent,
    canActivate:[LoginGuard]
   
   
  },
  {
    path: 'user_add',
    component:UserAddComponent,
    canActivate:[LoginGuard,RoleGuard]
  },
  {
    path:'confirm-user',
    component:ConfirmUserComponent,
    canActivate:[LoginGuard]
  },
  {
    path:'edit-user',
    component:EditUserComponent,
    canActivate:[LoginGuard]
  },
  {
    path:'edit-user-confirm',
    component:EditUserConfirmComponent,
    canActivate:[LoginGuard]
  },
  {
    path:'post_lists',
    component:PostListsComponent,
    canActivate:[LoginGuard]
  },
  {
    path:'post_create',
    component:PostCreateComponent,
    canActivate:[LoginGuard]
  },
  {
    path:'post-create-confirm',
    component:PostCreateConfirmComponent,
    canActivate:[LoginGuard]
  },
  {
   path:'post-edit',
   component:PostEditComponent,
   canActivate:[LoginGuard]
  },
  {
   path:'post-edit-confirm',
   component:PostEditConfirmComponent,
   canActivate:[LoginGuard]
  },
  
  {
    path: '',
    component: LoginComponent,
   
  },
  {
    path : '**' , 
    redirectTo : ''
  }
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
