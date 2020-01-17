import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlightService } from './flight.service';
import { Observable } from 'rxjs';
import { DummyFlightService } from './dummy-flight.service';
import { Flight } from '../../entities/flight';

@Injectable({
  providedIn: 'root',
  useClass: FlightService,
  //useClass: DummyFlightService,
  //useFactory: (http: HttpClient) => new FlightService(http),
  deps: [HttpClient]
})
export abstract class AbstractFlightService {
  abstract find(from: string, to:string): Observable<Flight[]>;
}