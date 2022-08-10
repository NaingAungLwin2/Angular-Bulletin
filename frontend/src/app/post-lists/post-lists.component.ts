import { Component, OnInit,ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PostService } from '../service/post.service';
import { MatDialog } from '@angular/material/dialog';
import { Post } from 'model';
import { DialogComponent } from '../dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';


@Component({
  selector: 'app-post-lists',
  templateUrl: './post-lists.component.html',
  styleUrls: ['./post-lists.component.css']
})
export class PostListsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public displayedColumns: string[] = ['title', 'description','created_at','updated_at','edit','delete'];
  public dataSource = new MatTableDataSource<Post>();
  public resp : string = ''; 
  public postid = sessionStorage.getItem('userId')
  public role = sessionStorage.getItem('userRole')
  public posts: Post[] = [];
  public post : any = [];
  public postcsv : any = [];
  public post2Col : any = [];
  status !: any[];
  formula:string = "Formula 1";
  searchForm !: FormGroup;
  searchTitle : string = ''
  searchDescritption : string = ''


  constructor(private postService: PostService , private dialog : MatDialog, private snack: MatSnackBar,private fg: FormBuilder,private router : Router) { }

  ngOnInit(): void {
    this.getPostList()
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
        
        this.snack.open("Succefully Deleted","Close",{
          duration: 2000
        })
        
       
      }
    });
  }
  deleteUser(id: any): void {
    console.log("Delete :: ", id)
    this.postService.deleteUser(id).subscribe(resp=> {
        this.resp=resp;
        this.getPostList()
        console.log("Deleted Successfully",this.resp)
    })
     
  
}
  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim(); 
  //   filterValue = filterValue.toLowerCase(); 
  //   this.dataSource.filter = filterValue;
  // } 

   
  

getPostList(): void {
    this.postService.getPostLists().subscribe(posts => {
      this.posts = posts;
      this.showData();
      this.toArray()
    }, error => {
      console.log('ERROR :: ', error);
    });
  }


search() {
  if(this.searchTitle == '' && this.searchDescritption == ''){
    this.getPostList();
  }
 

  else{
    const arr = {
      title : this.searchTitle,
      description: this.searchDescritption,
      
      
      
    }
    console.log(arr);
    this.postService.searchPost(arr).subscribe((post: Post) => {
     
        this.post = post;
        this.dataSource = new MatTableDataSource<Post>(this.post);
        this.dataSource.paginator = this.paginator;
      }, error => {
      console.log('ERROR :: ', error);
    });
  }
  
}
  
showData(): void {
    this.dataSource = new MatTableDataSource(this.posts);
    this.dataSource.paginator = this.paginator;
}
editPosts(id : any):void{
  sessionStorage.setItem('editpostid',id)
  
  this.router.navigateByUrl('post-edit')

  console.log(id)
}
toArray() {
  this.post2Col = [];
  this.posts.forEach((value: any)=> {
    //console.log(value);
    var obj = {
      title: value.title,
      description: value.description
    }
    this.post2Col.push(obj)
  });
  //console.log(this.post2Col)
}

downloadcsv():void{
  // this.postService.downloadcsv().subscribe(postcsv => {
  //   this.post2Col = postcsv;
  //   console.log('==============wefadfe',this.postcsv)
  //   this.showData();
  // }, error => {
  //   console.log('ERROR :: ', error);
  // });
  
  this.status = ["rejected", "pending", "approved"];
  
  var options = {
    
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: false,
    useBom: true,
    headers: ['Title', 'Description']
  };
  new AngularCsv(this.post2Col, this.formula, options);

}
canclebutton(){
  
    this.getPostList();
    this.searchTitle = ''
    this.searchDescritption = ''
    
    this.router.navigateByUrl('post_lists')
  
}
  

  

}
