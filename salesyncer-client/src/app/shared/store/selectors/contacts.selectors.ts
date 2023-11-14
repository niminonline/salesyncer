import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ContactsState } from '../state/contacts.state';

export const selectContactsState = createFeatureSelector<ContactsState>('contacts');

export const selectContactsData = createSelector(
  selectContactsState,
  (state) => state.contactsData
);

