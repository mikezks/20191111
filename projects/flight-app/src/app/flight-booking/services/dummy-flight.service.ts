import { Injectable } from '@angular/core';
import { AbstractFlightService } from './abstract-flight.service';
import { Observable, of } from 'rxjs';
import { Flight } from '../../entities/flight';

@Injectable()
export class DummyFlightService implements AbstractFlightService {

  find(from: string, to: string): Observable<Flight[]> {

    return of([{
      id: 17,
      from: 'Graz',
      to: 'Hamburg',
      date: '2022-01-01',
      delayed: true
    }]);
  }
}
