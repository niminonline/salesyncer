import Branch from "../entities/branch";

export const qGetBranchData = async () => {
  return await Branch.find({});
};
export const qaddBranchData = async (newBranchData: object) => {
  const newBranch = new Branch(newBranchData);

  return await newBranch.save();
};

export const qUpdateBranchDataById = async (
  _id: string,
  newBranchData: object
) => {
  try {
    const updateOperation = {
      $set: newBranchData,
    };
    const response = await Branch.findByIdAndUpdate(_id, updateOperation);
    return response;
  } catch (error) {}
};

export const qGetBranchDataByName = async (branchName: string) => {
  return await Branch.findOne({ branchName: branchName });
};
export const qUpdateEmpCount = async (branchName: string) => {
  return await Branch.findOneAndUpdate(
    { branchName: branchName },
    { $inc: { empCount: 1 } },
    { new: true }
  );
};
