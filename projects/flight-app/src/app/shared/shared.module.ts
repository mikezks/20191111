import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityPipe } from './pipes/city.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatusToggleComponent } from './components/status-toggle/status-toggle.component';

@NgModule({
  declarations: [
    CityPipe,
    StatusToggleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CityPipe,
    StatusToggleComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
