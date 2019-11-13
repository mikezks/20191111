import { Action, createReducer, on } from '@ngrx/store';
import * as FlightBookingActions from '../actions/flight-booking.actions';
import { Flight } from '@flight-workspace/flight-api';
import { RootState } from '../../../+state';

export const flightBookingFeatureKey = 'flightBooking';

export interface State {
  flights: Flight[]
}

export const initialState: State = {
  flights: []
};

export interface FeatureState extends RootState {
  flightBooking: State
}

const flightBookingReducer = createReducer(
  initialState,

  on(
    FlightBookingActions.flightsLoaded,
    (state, action) => ({ ...state, flights: action.flights })
  ),

);

export function reducer(state: State | undefined, action: Action) {
  return flightBookingReducer(state, action);
}
