import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { initialAuthState, AuthState } from '../state/auth.state';


export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.setUserId, (state, { email }) => ({ ...state, email })),
  on(AuthActions.clearUserId, (state) => ({ ...state, email: null })),
  on(AuthActions.setUserToken, (state, { token }) => ({...state,token})),
  on(AuthActions.clearUserToken, (state) => ({ ...state, email: null })),
  on(AuthActions.clearAuthState,(state)=>(initialAuthState))
);
