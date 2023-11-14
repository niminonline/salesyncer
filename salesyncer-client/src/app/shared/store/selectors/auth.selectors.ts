import { AuthState } from "../state/auth.state";
import {createFeatureSelector,createSelector} from '@ngrx/store'

export const selectAuthState= createFeatureSelector<AuthState>('auth');
export const selectEmployeeId= createSelector(selectAuthState,(state)=>(state._id));
export const selectEmployeeToken= createSelector(selectAuthState,(state)=>state.token);

