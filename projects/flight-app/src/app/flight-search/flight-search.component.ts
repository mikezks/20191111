import { Component, OnInit } from '@angular/core';
import { Flight } from '../entities/flight';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  search(): void {
    const url = 'http://www.angular.at/api/flight';
    
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');

    const params = new HttpParams()
      .set('from', this.from)
      .set('to', this.to);

    this.http
      .get<Flight[]>(url, { params, headers })
      .subscribe(
        flights => this.flights = flights,
        error => console.error('Error loading flights', error)
      );
  }

  select(f: Flight) {
    this.selectedFlight = f;
  }
}
