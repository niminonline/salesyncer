import { BranchData,Branch } from "src/app/shared/interfaces/interfaces";

export interface BranchDataState {
  branchData: Branch[]|[];
  }

  export const initialState: BranchData = {
    branchData: [],
  };

