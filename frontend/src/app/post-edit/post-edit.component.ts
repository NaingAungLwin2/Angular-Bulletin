import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../service/post.service';
import { LoginAuthService } from '../service/login.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  id = sessionStorage.getItem('editpostid')!;
  
  nrstatus : string = ''
  isLoadingResults = true;
  PostForm !: FormGroup;
  post : any = [];
  constructor(private fg:FormBuilder,private routes: Router,private postService:PostService,private loginService : LoginAuthService) {this.createForm() }
  
  ngOnInit(): void {
    this.getPostDetail(this.id)
  }

  createForm(){
    this.PostForm = this.fg.group
    ({ title : ['',Validators.required],description : ['', Validators.required],status : ['',Validators.required]
    })
   
}
getPostDetail(id:string) {
  this.postService.getPostDetail(id).subscribe(post => {
    this.post = post;
    console.log(this.post.title)
    if(post.status == '1'){
      this.nrstatus = '1'
    }
    else{
      this.nrstatus = '0'
    }
  }, error => {
    console.log('ERROR :: ', error);
  });
}
editPost(){
 
  sessionStorage.setItem('title',this.PostForm.value.title);
  sessionStorage.setItem('description',this.PostForm.value.description);
  sessionStorage.setItem('status',this.PostForm.value.status);
  this.checkPost(this.PostForm.value.title)
  
  
 
}
checkPost(post:string): void {
  this.postService.checkPostUpdate(post).then(res => {
    if (res) {
      console.log('Same post ==> ',res);
      alert('This post is already exist.')
    }
    else {
      
      this.routes.navigateByUrl('post-edit-confirm');
    }
  }).catch(error => {
    console.log('error ', error);
  });
}

}
