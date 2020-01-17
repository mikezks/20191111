import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validateCity, validateCityWithWhiteList } from '../../shared/validation/city.validator';
import { validateRoundTrip } from '../../shared/validation/round-trip-validator';
import { AbstractFlightService } from '../services/abstract-flight.service';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.css']
})
export class FlightEditComponent implements OnInit {
  id = 2;
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private flightService: AbstractFlightService) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      id: [
        1
      ],
      from: [
        'Graz',
        [
          Validators.required,
          Validators.minLength(3),
          validateCity
        ]
      ],
      to: [
        'Hamburg',
        [
          Validators.required,
          Validators.minLength(3),
          validateCityWithWhiteList([
            'Wien',
            'Berlin'
          ])
        ]
      ],
      date: [
        (new Date()).toISOString()
      ]
    });

    this.editForm.validator = validateRoundTrip;

    this.flightService
      .findById(this.id)
      .subscribe(
        flight => this.editForm.patchValue(flight)
      );

    this.editForm.valueChanges
      .subscribe(console.log);
  }

  save(): void {
    console.log('value', this.editForm.value);
    console.log('valid', this.editForm.valid);
    console.log('dirty', this.editForm.dirty);
    console.log('touched', this.editForm.touched);

    this.flightService
      .save(this.editForm.value)
      .subscribe(
        flight => this.editForm.patchValue(flight)
      );
  }
}
