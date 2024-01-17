import { Injectable } from '@angular/core';
import { map, Observable, of, delay } from 'rxjs';
import { POSTS_DATA } from '@data/post-data';
import { ApiResponse } from '@config/interfaces/api-response.interface';
import { Post } from '@config/interfaces/post.interface';
import { ArrayUtil } from '@utils/array.util';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  getAllPosts(): Observable<Array<Post>> {
    return of(POSTS_DATA);
  }

  getPost(id: number): Observable<Post | null> {
    return of(POSTS_DATA.find((item) => item.id === id));
  }

  getPaginatedPosts(
    page: number = 1,
    perPage: number = 15,
    query: string
  ): Observable<ApiResponse<Post>> {
    const timer = page > 1 ? 2000 : 0;
    const propertiesFilter = ['id', 'title', 'text'];

    return of(POSTS_DATA).pipe(
      delay(timer),
      map((res) => ArrayUtil.filterData<Post>(res, query, propertiesFilter)),
      map((res) => {
        const totalItems = res.length;
        const totalPages = Math.round(totalItems / perPage);

        const offset = perPage * page;
        const start = offset - perPage;

        const data = res.slice(start, offset);

        return {
          page,
          perPage,
          data,
          total_pages: totalPages,
          total: totalItems,
        };
      })
    );
  }
}
