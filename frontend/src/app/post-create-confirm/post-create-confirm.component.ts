import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';
import { Post } from 'model';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-post-create-confirm',
  templateUrl: './post-create-confirm.component.html',
  styleUrls: ['./post-create-confirm.component.css']
})
export class PostCreateConfirmComponent  implements OnInit {
  public isEdit = false;
  public users: Post[] = [];
  
  UserForm !: FormGroup;
  posttitle = sessionStorage.getItem('title')
  postdescription = sessionStorage.getItem('description')
  poststatus = sessionStorage.getItem('status')
  posterid = sessionStorage.getItem('userId')
  

  constructor(private postService:PostService, private router:Router) { }

  postadd(){
    const post = {
      title: this.posttitle,
      description: this.postdescription,
      status : this.poststatus,
      ownerid : this.posterid
      
     
    };
    
      this.postService.postCreate(post).subscribe((data) => {
        this.users.unshift(data);
        console.log(data)
        
        this.router.navigateByUrl('post_lists')
    }, error => {
      console.log('ERROR :: ', error);
    });
  
  
  
  }
  cancleuser(){
    
    
    this.router.navigateByUrl('post_create')
   
  }
  

  ngOnInit(): void {
  }

}
