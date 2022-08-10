import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';
import { Post } from 'model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-edit-confirm',
  templateUrl: './post-edit-confirm.component.html',
  styleUrls: ['./post-edit-confirm.component.css']
})
export class PostEditConfirmComponent implements OnInit {
  public posts : Post[]=[]
  posttitle = sessionStorage.getItem('title')
  postdescription = sessionStorage.getItem('description')
  poststatus = sessionStorage.getItem('status')
  constructor(private postService : PostService,private route:Router) { }

  ngOnInit(): void {
  }

  postEdit(){
    const post = {
      id : sessionStorage.getItem('editpostid'),
      title: this.posttitle,
      description: this.postdescription,
      status:this.poststatus
      };
    
      this.postService.postUpdate(post).subscribe((data) => {
        this.posts.unshift(data);
        console.log(data)
        this.route.navigateByUrl('post_lists')
    }, error => {
      console.log('ERROR :: ', error);
    });

  }

}
