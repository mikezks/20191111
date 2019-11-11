import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '../entities/flight';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  /* flights = [
    {
      id: 1,
      from: 'Wien',
      to: 'Innsbruck',
      delayed: false,
      date: (new Date()).toISOString()
    }
  ] */

  constructor(private http: HttpClient) { }

  find(from: string, to: string): Observable<Flight[]> {
    const url = 'http://www.angular.at/api/flight';
    
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');

    const params = new HttpParams()
      .set('from', from)
      .set('to', to);

    return this.http
      .get<Flight[]>(url, { params, headers })
      .pipe(
        //tap(flights => console.log('triggered inside service', flights)),
        //tap(flights => this.flights = [ ...this.flights, ...flights])
      );
  }
}
