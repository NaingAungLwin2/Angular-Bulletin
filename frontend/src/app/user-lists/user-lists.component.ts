import { Component, OnInit,ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserListsService } from '../service/user-lists.service';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'model';
import { DialogComponent } from '../dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

import * as moment from 'moment';

@Component({
  selector: 'app-user-lists',
  templateUrl: './user-lists.component.html',
  styleUrls: ['./user-lists.component.css']
})
export class UserListsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public displayedColumns: string[] = [ 'name', 'email','phone','address','dob','created_at','updated_at','edit','delete'];
  public dataSource = new MatTableDataSource<User>();
  public resp : string = ''; 
  public userid = sessionStorage.getItem('userId')
  searchName : any = ''
  searchEmail : any = ''
  searchDob : any = null
  public prevImagePath : any; 
  public nocontent: any = '';
 
  public users: User[] = [];
  public user : any = [];



 


  constructor(private userSvc: UserListsService,private dialog : MatDialog, private snack: MatSnackBar,private router : Router) {
    
   }

  ngOnInit(): void {
    this.getUserList()
    
  }
  openDialog(id:any) {
    const dialogRef = this.dialog.open(DialogComponent,{
      data:{
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteUser(id)
        const a = document.createElement('a');
        a.click();
        a.remove();
        this.getUserList()
        this.snack.open("Succefully Deleted","Close",{
          duration: 2000
        })
        
       
      }
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
  } 

   
  

  getUserList(): void {
    this.userSvc.getUserLists().subscribe(users => {
      this.users = users;
      this.showData();
    }, error => {
      
    });
  }

deleteUser(id: any): void {
    
    this.userSvc.deleteUser(id).subscribe(resp=> {
        this.resp=resp;
        
        
        this.searchName = ''
        this.searchDob = ''
        this.searchEmail = ''
        
    })
     
  
}
showData(): void {
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.paginator = this.paginator;
}
editUser(id : any){
  sessionStorage.setItem('editid', id);
}

  search() {
    let searchNewDob = moment(this.searchDob).format('YYYY-MM-DD')
    if(this.searchName == '' && this.searchEmail == '' && this.searchDob == null){
     this.getUserList();
    
    }
    
    else{
      const arr = {
      'name': this.searchName,
      'email': this.searchEmail,
      'dob': searchNewDob,
   
  
    
}
    
    this.userSvc.searchUser(arr).subscribe((user: User) => {
      
      this.user = user;
     
      this.dataSource = new MatTableDataSource<User>(this.user);
      this.dataSource.paginator = this.paginator;
      


      
    }
        , error => {
          console.log('ERROR :: ', error);
        });
    

    }
}
canclebutton(){
  this.getUserList();
  this.searchName = ''
  this.searchEmail = ''
  this. searchDob = null
  this.router.navigateByUrl('userlists')
}
  

  

}
