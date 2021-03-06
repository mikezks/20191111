import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer, Observable, Subscription, interval, combineLatest, iif, of } from 'rxjs';
import { tap, share, switchMap, debounceTime, filter, map, distinctUntilChanged, startWith } from 'rxjs/operators';
import { FlightService, Flight } from '@flight-workspace/flight-api';
import { FormControl } from '@angular/forms';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit, OnDestroy {

  timer$: Observable<number>;
  timerSubscription: Subscription;

  control = new FormControl();
  flights$: Observable<Flight[]>;
  loading: boolean;
  online$: Observable<boolean>;
  online: boolean;

  constructor(
    private flightService: FlightService,
    private http: HttpClient) { }

  ngOnInit() {
    //this.rxjsDemo();
    this.initTypeahead();
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

  initTypeahead(): void {
    this.online$ = interval(2000)
      .pipe(
        startWith(0),
        map(() => Math.random() < 0.5),
        distinctUntilChanged(),
        tap(online => this.online = online)
      );

    this.flights$ = this.control.valueChanges
      .pipe(
        from$ => combineLatest(from$, this.online$),
        filter(([from, online]) => online),
        map(([from, online]) => from),
        debounceTime(300),
        //filter(from => from.length > 2),
        distinctUntilChanged(),
        switchMap(from =>
          iif(
            () => from.length > 2,
            of(from)
              .pipe(
                tap(() => this.loading = true),
                switchMap(from => this.load(from)),
                tap(() => this.loading = false)
              ),
            of([])
          )
        )
      );
  }

  load(from: string): Observable<Flight[]>  {
    const url = "http://www.angular.at/api/flight";

    const params = new HttpParams()
                        .set('from', from);

    const headers = new HttpHeaders()
                        .set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, {params, headers});
  };

  ngOnDestroy(): void {
    //this.timerSubscription.unsubscribe();
  }
}
