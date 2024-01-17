import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HardwareBackButtonService {
  private _enable$ = new Subject<boolean>();

  get enable$(): Observable<boolean> {
    return this._enable$.asObservable();
  }

  set enable$(value: any) {
    this._enable$.next(value);
  }
}
