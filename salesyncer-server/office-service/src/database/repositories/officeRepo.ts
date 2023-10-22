import Branch from "../entities/branch";

export const qGetBranchData = async () => {
  return await Branch.find({});
};
export const qaddBranchData = async (newBranchData:object) => {
  const newBranch= new Branch(newBranchData)

  return await newBranch.save();
};

