import { Action, createReducer, on } from '@ngrx/store';
import * as AppActions from '../actions/app.actions';

export const appFeatureKey = 'app';

export interface State {
  counter: number;
}

export const initialState: State = {
  counter: 50
};

const appReducer = createReducer(
  initialState,

  on(AppActions.loadApps, state => state),

);

export function reducer(state: State | undefined, action: Action) {
  return appReducer(state, action);
}
