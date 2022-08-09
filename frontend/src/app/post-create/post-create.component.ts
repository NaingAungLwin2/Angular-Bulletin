import { Component} from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../service/post.service';
import { LoginAuthService } from '../service/login.service';
import { Post } from '../models';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent{
  data = [];
  logindata = [];
  hide = true;
  isLoadingResults = true;
  PostForm !: FormGroup;
  postTitle !: string;
  postDescription !: string;
  
  userid = '1';
  public users: Post[] = [];
  public user = {
    title: null,
    description: null,
    status:null
   

  }
  
  

  constructor(private fg: FormBuilder,private routes: Router,private postService:PostService,private loginService : LoginAuthService,) {
  this.createForm();
  
  }

 
createForm(){
    this.PostForm = this.fg.group
    ({ title : ['',Validators.required],description : ['', Validators.required],status :['',Validators.required]
    })
   
}


addPost(){
  sessionStorage.setItem('title',this.PostForm.value.title);
  sessionStorage.setItem('description',this.PostForm.value.description);
  sessionStorage.setItem('status',this.PostForm.value.status)
  this.checkPost(this.PostForm.value.title)
  

}

checkPost(title:string): void {
  this.postService.checkPost(title).then(res => {
    if (res) {
      console.log('Same post ==> ',res);
      alert('This post is already exist.')
    }
    else {
      console.log('Same post ==> ',res)
      this.routes.navigateByUrl('post-create-confirm');
    }
  }).catch(error => {
    console.log('error ', error);
  });
}
}
