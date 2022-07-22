import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    data: { title: 'List of User' }
  },
  {
    path: 'login',
    component: LoginComponent,
    
  }
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
