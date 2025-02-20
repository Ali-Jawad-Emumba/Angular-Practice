import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  isLoggedIn: boolean = false;
  numbers: Observable<number> = of(1, 2, 3, 4, 5);
  alphabets: Observable<string> = of('a', 'b', 'c', 'd', 'e');

  restaurants: any = {
    'Pizza Place': ['Margherita', 'Pepperoni', 'BBQ Chicken'],
    'Burger Joint': ['Cheeseburger', 'Veggie Burger', 'Double Patty'],
    'Sushi Spot': ['Salmon Roll', 'Tuna Nigiri', 'California Roll'],
  };

  userSearch$: Observable<string> = from([
    'Pizza Place',
    'Burger Joint',
    'Sushi Spot',
    '',
  ]);

  userProfile$: Observable<any> = of({ name: 'Ali', role: 'Food Lover' });
  favoriteRestaurants$: Observable<string[]> = of([
    'Pizza Place',
    'Burger Joint',
  ]);
  properties = [
    { id: 1, city: 'New York', type: 'apartment', price: 300000 },
    { id: 2, city: 'New York', type: 'house', price: 500000 },
    { id: 3, city: 'Los Angeles', type: 'apartment', price: 250000 },
    { id: 4, city: 'Los Angeles', type: 'house', price: 600000 },
    { id: 5, city: 'Chicago', type: 'apartment', price: 200000 },
    { id: 6, city: 'Chicago', type: 'house', price: 400000 },
  ];
  constructor() {}
}
