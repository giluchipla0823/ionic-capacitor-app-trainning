import { Injectable } from '@angular/core';
import { Observable, delay, of, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(
    email: string,
    password: string
  ): Observable<{
    email: string;
  }> {
    return of({}).pipe(
      delay(2000),
      switchMap(() => {
        if (email === 'admin@admin.com' && password === 'secret') {
          return of({
            email,
          });
        }

        return throwError(() => ({
          status: 404,
          message: 'Incorrect access credentials',
        }));
      })
    );
  }
}
