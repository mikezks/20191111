import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer, Observable, Subscription } from 'rxjs';
import { tap, share, switchMap } from 'rxjs/operators';
import { FlightService } from '@flight-workspace/flight-api';

@Component({
  selector: 'app-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit, OnDestroy {

  timer$: Observable<number>;
  timerSubscription: Subscription;

  constructor(private flightService: FlightService) { }

  ngOnInit() {
    this.rxjsDemo();
  }

  rxjsDemo(): void {
    this.timer$ = timer(0, 1000)
      .pipe(
        tap(value => console.log('pipe logic', value)),
        //share()
      );

    const httpCall = this.flightService.find('Wien', 'Berlin');

/*     this.timer$
        .pipe(
          switchMap(() => httpCall)
        )
        .subscribe(console.log); */

    this.timerSubscription = this.timer$
      .subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }
}
