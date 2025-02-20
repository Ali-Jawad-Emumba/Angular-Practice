import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../../utils/services/main.service';
import { PracticeRoutingModule } from './practice.routing.module';
import { ColorChangeDirective } from '../../utils/directives/color-change.directive';
import {
  Subscription,
  combineLatest,
  filter,
  map,
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
  filterNumbers: number[] = [];
  mapNumbers: number[] = [];
  switchMapNumberLetters: string[] = [];
  subscriptions: Subscription[] = [];
  takeNumber!: number;
  color: string = 'red';
  childValueUsingOutput!: string;

  parentInput!: string;

  constructor(private router: Router, private mainService: MainService) {}
  logout() {
    this.mainService.isLoggedIn === false;
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    const filterSubscription = this.mainService.numbers
      .pipe(filter((val: number) => val > 3))
      .subscribe((val: number) => this.filterNumbers.push(val));

    const mapSubscription = this.mainService.numbers
      .pipe(map((val: number) => val * 2))
      .subscribe((val: number) => this.mapNumbers.push(val));

    const switchSubscrcription = this.mainService.alphabets
      .pipe(
        switchMap((alphabet) => {
          return this.mainService.numbers.pipe(
            map((number) => `${alphabet}${number}`)
          );
        })
      )
      .subscribe((val) => this.switchMapNumberLetters.push(val));

    const takeSubscription = this.mainService.numbers
      .pipe(take(1))
      .subscribe((val: number) => (this.takeNumber = val));

    this.subscriptions.push(
      filterSubscription,
      mapSubscription,
      switchSubscrcription,
      takeSubscription
    );
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
