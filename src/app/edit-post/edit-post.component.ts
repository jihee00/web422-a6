import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy{

  blogPost: BlogPost;
  tags: string;
  sub: any;

  constructor(private postData: PostService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.postData.getPostbyId(params['id']).subscribe(data => {
        this.blogPost = data;
        this.tags = data.tags.toString();
      });
    });
  }

  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
    };
  }

  formSubmit(): void { 
    this.blogPost.tags = this.tags.split(",").map(tag => tag.trim());
    this.postData.updatePostById(this.blogPost._id, this.blogPost).subscribe(() => this.router.navigate(['/admin']));
  }

  deltePost(): void{
    this.postData.deletePostById(this.blogPost._id).subscribe(()=> this.router.navigate(['admin']));
  }
}
