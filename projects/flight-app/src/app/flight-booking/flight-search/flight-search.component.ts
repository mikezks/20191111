import { Component, OnInit } from '@angular/core';
import { Flight } from '../../entities/flight';
import { FlightService } from '../services/flight.service';
import { AbstractFlightService } from '../services/abstract-flight.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  from = 'Hamburg';
  to = 'Graz';
  flights: Array<Flight> = [];
  selectedFlight: Flight;
  /* get flights() {
    return this.flightService.flights;
  } */

  basket: object = {
    "3": true,
    "5": true,
  };

  constructor(private flightService: AbstractFlightService) { }

  ngOnInit(): void {
  }

  search(): void {
    this.flightService
      .find(this.from, this.to)
      .subscribe(
        flights => this.flights = flights,
        error => console.error('Error loading flights', error)
      );
  }

  select(f: Flight) {
    this.selectedFlight = f;
  }
}
