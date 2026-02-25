import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loading$ = new BehaviorSubject<boolean>(false);
  private requestCount = 0;

  isLoading$ = this.loading$.asObservable();

  show(): void {
    this.requestCount++;
    this.loading$.next(true);
  }

  hide(): void {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.requestCount = 0;
      this.loading$.next(false);
    }
  }
}
