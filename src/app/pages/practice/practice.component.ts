import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Route, Router } from '@angular/router';
import { MainService } from '../../utils/services/main.service';
import { PracticeRoutingModule } from './practice.routing.module';
import { ColorChangeDirective } from '../../utils/directives/color-change.directive';
import {
  Subscription,
  combineLatest,
  concatMap,
  filter,
  forkJoin,
  map,
  mergeMap,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ChildComponent } from '../../components/child/child.component';

@Component({
  selector: 'app-practice',
  imports: [
    PracticeRoutingModule,
    ColorChangeDirective,
    CommonModule,
    ChildComponent,
  ],
  templateUrl: './practice.component.html',
  styleUrl: './practice.component.css',
  animations: [
    trigger('blueAndRed', [
      state('red', style({ backgroundColor: 'red' })),
      state('blue', style({ backgroundColor: 'blue' })),
      transition('red <=> blue', animate('500ms ease-out')),
    ]),
  ],
})
export class PracticeComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  results: any = {
    filtered: [],
    mapped: [],
    switchMap: [],
    mergeMap: [],
    concatMap: [],
  };

  color: string = 'red';
  childValueUsingOutput!: string;

  parentInput!: string;
  filterationData: any = {
    city: '',
    type: '',
    price: 0,
  };
  options: any = { cities: [], types: [], prices: [] };

  constructor(private router: Router, public mainService: MainService) {}
  logout() {
    this.mainService.isLoggedIn === false;
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.options = {
      cities: [
        ...new Set(
          this.mainService.properties.map((property) => property.city)
        ),
      ],
      types: [
        ...new Set(
          this.mainService.properties.map((property) => property.type)
        ),
      ],
      prices: [
        ...new Set(
          this.mainService.properties.map((property) => property.price)
        ),
      ],
    };
    const filteredSearches$ = this.mainService.userSearch$.pipe(
      filter((val: string) => Boolean(val.trim()))
    );
    const mappedSearches$ = filteredSearches$.pipe(
      map((val: string) => this.mainService.restaurants[val])
    );
    const switchMapResults$ = filteredSearches$.pipe(
      switchMap((val: string) => of(this.mainService.restaurants[val]))
    );
    const mergeMapResults$ = filteredSearches$.pipe(
      mergeMap((val: string) => of(this.mainService.restaurants[val]))
    );
    const concatMapResults$ = filteredSearches$.pipe(
      concatMap((val: string) => of(this.mainService.restaurants[val]))
    );
    const limitedtResults$ = filteredSearches$.pipe(take(1));

    const forkJoinResults$ = forkJoin({
      profile: this.mainService.userProfile$,
      favorite: this.mainService.favoriteRestaurants$,
    });
    const combinedLatestResults$ = combineLatest([
      filteredSearches$,
      this.mainService.favoriteRestaurants$,
    ]);
    this.subscriptions = [
      filteredSearches$.subscribe((val) => this.results.filtered.push(val)),
      mappedSearches$.subscribe((val) => this.results.mapped.push(val)),
      switchMapResults$.subscribe((val) => this.results.switchMap.push(val)),
      mergeMapResults$.subscribe((val) => this.results.mergeMap.push(val)),
      concatMapResults$.subscribe((val) => this.results.concatMap.push(val)),
      limitedtResults$.subscribe((val) => (this.results.take = val)),
      forkJoinResults$.subscribe((val) => (this.results.forkJoin = val)),
      combinedLatestResults$.subscribe(
        (val) => (this.results.combineLatest = val)
      ),
    ];
  }
  getOptions = (type: string) => [
    ...new Set(
      this.mainService.properties.map((property: any) => property[type])
    ),
  ];
  getCity = (city: string) => city.replace(/ /, '-');
  goToFilter() {
    const pathArr = ['filter']; // Start with the base path

    if (this.filterationData.city)
      pathArr.push(this.filterationData.city.replace(/ /g, '-')); // Replace all spaces with '-'

    if (this.filterationData.type) pathArr.push(this.filterationData.type);

    if (this.filterationData.price) pathArr.push(this.filterationData.price);

    this.router.navigate(pathArr); // Pass an array directly
  }

  setData(dataType: string, event: Event) {
    const input = event.target as HTMLInputElement;
    this.filterationData[dataType] = input.value;
  }
  updateChildValue(val: string) {
    this.childValueUsingOutput = val;
  }
  updateParentValue(event: Event) {
    const input = event.target as HTMLInputElement;

    this.parentInput = input.value;
  }

  setColor(color: string) {
    this.color = color;
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscribtion) => subscribtion.unsubscribe());
  }
}
