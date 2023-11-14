import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as BranchDataActions from '../actions/branchData.actions';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { BranchData, Branch } from 'src/app/shared/interfaces/interfaces';
import { Store } from '@ngrx/store';

@Injectable()
export class BranchDataEffects {
  constructor(
    private actions$: Actions,
    private sharedApi: SharedApiService,
    private store: Store
  ) {}

//   private defaultBranchData: BranchData = [{
   
//         _id: "",
//         branchCode: "",
//         branchName: "",
//         location: "",
//         empCount: 0,
    
//  } ]

 private defaultBranchData: BranchData ={
  branchData:[],
  status: "",
  message: "",
}




  retrieveContactsData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BranchDataActions.retrieveBranchData),
      switchMap(() => {
        return this.sharedApi.getBranches().pipe(
          tap((response) => {
            // console.log('API Response:', response); 
          }),
          map((response) =>
            BranchDataActions.storeBranchData({
              branchData: response.branchData || this.defaultBranchData,
            })
          ),
          catchError(() => of({ type: 'error' }))
        );
      })
    )
  );
}
