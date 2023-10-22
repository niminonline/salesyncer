import Branch from "../entities/branch";

export const qGetBranchData = async () => {
  return await Branch.find({});
};

