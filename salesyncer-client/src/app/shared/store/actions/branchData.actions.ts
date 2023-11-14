import { BranchData,Branch } from "src/app/shared/interfaces/interfaces";
import { createAction,props } from "@ngrx/store";


export const storeBranchData = createAction('[branchData] Store Branch Data', props<{ branchData: Array<Branch> }>());

export const retrieveBranchData = createAction('[branchData] Retrieve Branch Data');


