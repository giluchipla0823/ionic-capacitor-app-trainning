import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  IonInfiniteScroll,
  NavController,
  RefresherCustomEvent,
} from '@ionic/angular';
import { finalize, Subject, takeUntil } from 'rxjs';

import { PostService } from '@services/api/post.service';
import { Post } from '@config/interfaces/post.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  @ViewChild(IonInfiniteScroll, { static: true })
  infiniteScroll!: IonInfiniteScroll;

  posts: Array<Post> = [];
  totalPosts = 0;

  private searchQuery = '';
  private page = 1;
  private perPage = 15;
  private pageDestroyed$: Subject<boolean> = new Subject<boolean>();

  get emptyResultsData(): any {
    return {
      message: `No results for "${this.searchQuery}"`,
      additionalMessage: 'Check spelling or try a new search',
    };
  }

  constructor(
    private navController: NavController,
    private PostService: PostService
  ) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  ngOnDestroy(): void {
    this.pageDestroyed$.next(true);
    this.pageDestroyed$.complete();
  }

  goToPostDetails(id: number): void {
    this.navController.navigateForward(`post/${id}`);
  }

  handleRefresh($event: RefresherCustomEvent): void {
    setTimeout(() => {
      this.page = 1;
      this.posts = [];

      this.fetchPosts();

      $event.target.complete();
    }, 2000);
  }

  onSearchChange(value: string): void {
    this.searchQuery = value;
    this.page = 1;
    this.posts = [];

    this.fetchPosts();
  }

  loadMore(): void {
    if (this.posts.length === this.totalPosts) {
      return;
    }

    this.page++;

    this.fetchPosts();
  }

  private fetchPosts(): void {
    this.infiniteScroll.disabled = false;

    this.PostService.getPaginatedPosts(
      this.page,
      this.perPage,
      this.searchQuery
    )
      .pipe(
        takeUntil(this.pageDestroyed$),
        finalize(() => {
          this.infiniteScroll.complete();

          this.infiniteScroll.disabled = this.posts.length === this.totalPosts;
        })
      )
      .subscribe(({ data, total }) => {
        this.posts = [...this.posts, ...data];
        this.totalPosts = total;
      });
  }
}
