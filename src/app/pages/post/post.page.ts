import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '@config/interfaces/post.interface';
import { PostService } from '@services/api/post.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-post-page',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  id: number;
  post: Post;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService
  ) {
    this.id = Number(this.activatedRoute.snapshot.params['id']);
  }

  ngOnInit(): void {
    this.postService
      .getPost(this.id)
      .pipe(tap(console.log))
      .subscribe((post) => (this.post = post));
  }
}
