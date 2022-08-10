import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import { UserListsComponent } from './user-lists/user-lists.component';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSortModule } from "@angular/material/sort";
import { UserAddComponent } from './user-add/user-add.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { ConfirmUserComponent } from './confirm-user/confirm-user.component';
import {MatListModule} from '@angular/material/list';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditUserConfirmComponent } from './edit-user-confirm/edit-user-confirm.component';
import { PostListsComponent } from './post-lists/post-lists.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostCreateConfirmComponent } from './post-create-confirm/post-create-confirm.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostEditConfirmComponent } from './post-edit-confirm/post-edit-confirm.component';
import { DatepipePipe } from './datepipe.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NavbarComponent } from './navbar/navbar.component';
import { UsersComponent } from './users/users.component';
import { CsvUploadComponent } from './csv-upload/csv-upload.component';
import { LoginedUserprofileComponent } from './logined-userprofile/logined-userprofile.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';







@NgModule({
  declarations: [
    AppComponent,
   
    LoginComponent,
    UserListsComponent,
    DialogComponent,
    UserAddComponent,
    ConfirmUserComponent,
    EditUserComponent,
    EditUserConfirmComponent,
    PostListsComponent,
    PostCreateComponent,
    PostCreateConfirmComponent,
    PostEditComponent,
    PostEditConfirmComponent,
    DatepipePipe,
    NavbarComponent,
    UsersComponent,
    CsvUploadComponent,
    LoginedUserprofileComponent,
    PasswordResetComponent
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatSelectModule,
    MatListModule,
    NgbModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
