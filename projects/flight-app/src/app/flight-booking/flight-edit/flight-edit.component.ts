import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html'
})
export class FlightEditComponent implements OnInit {
  id: string;
  showDetails: string;
  showWarning = false;

  /* control = new FormControl();
  form = new FormGroup({
    from: this.control
  }); */

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.id = p['id'];
      this.showDetails = p['showDetails'];
    });

    /* this.control.patchValue('Peter');
    this.form.patchValue({ from: 'Hans'}); */
  }

}
