import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '../../entities/flight';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AbstractFlightService } from './abstract-flight.service';

@Injectable()
export class FlightService implements AbstractFlightService {
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

  findById(id: number): Observable<Flight> {
    const url = 'http://www.angular.at/api/flight';
    
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');

    const params = new HttpParams()
      .set('id', id+'');

    return this.http
      .get<Flight>(url, { params, headers });
  }

  save(flight: Flight): Observable<Flight> {
    const url = 'http://www.angular.at/api/flight';
    
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');

    return this.http
      .post<Flight>(url, flight, { headers });
  }
}
