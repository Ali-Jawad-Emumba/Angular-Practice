import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  isLoggedIn: boolean = false;
  numbers: Observable<number> = of(1, 2, 3, 4, 5);
  alphabets: Observable<string> = of('a', 'b', 'c', 'd', 'e');

  constructor() {}
}
