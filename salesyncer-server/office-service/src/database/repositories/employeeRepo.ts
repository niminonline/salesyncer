import Employee from "../entities/employee";
import LeaveCategory from "../entities/leaveCategory";
import Leave from "../entities/leave";

export const qEmployeeDataByEmail = async (email: string) => {
  return await Employee.findOne({ email });
};
export const qEmployeeDataById = async (_id: string) => {
  return await Employee.findById(_id);
};
export const qEmployeeDataByPhone = async (phone: string) => {
  return await Employee.findOne({ phone });
};
export const qAddEmployeeData = async (employeeData: object) => {
  const newEmployee = new Employee(employeeData);
  const response = await newEmployee.save();
  return response;
};

export const qEmployeesData = async () => {
  return await Employee.find().select("-password");
};

export const qUpdateEmployeeDataById = async (
  _id: string,
  newEmpData: object
) => {
  try {
    const updateOperation = {
      $set: newEmpData,
    };
    const response = await Employee.findByIdAndUpdate(_id, updateOperation);
    return response;
  } catch (error) {}
};

export const qGetLeaveCategoryData = async () => {
  return await LeaveCategory.find({});
};

export const qAddLeaveData = async (leaveData: object) => {
  const newLeaveData = new Leave(leaveData);
  const response = await newLeaveData.save();
  return response;
};
export const qfetchLeaveData = async (
  _id: string,
  startDate: Date,
  endDate: Date
) => {
  const response = Leave.find({
    employeeObj_id: _id,
    startDate: { $gte: startDate, $lte: endDate },
  });
  return response;

};
export const qGetLeaveRequests = async () => {
  const response = await Leave.find({
    $or: [{ status: "Pending" }, { status: "Cancellation Requested" }],
  }).populate("employee");
  return response;
};

export const qDoleaveAction = async (_id: string, toDo: string) => {
  console.log("Request reached repo", _id, toDo);

  const leaveData = await Leave.findById(_id);
  const emp_id = leaveData?.employee;
  const employeeData = await Employee.findById(emp_id);
  if (leaveData && leaveData.startDate && leaveData.endDate) {
    let days =
      (leaveData.endDate.getTime() - leaveData.startDate.getTime()) /
      (1000 * 60 * 60 * 24);
    if (leaveData.startDate !== leaveData.endDate) {
      days += 1;
    }
    console.log("Days===", days);
    const type = leaveData?.leaveCategory;

    if (toDo === "approve") {
      console.log(employeeData);

      if (type == "Casual") {
        if (employeeData && employeeData?.casualLeaveBalance >= days) {
          const approved = await Leave.findOneAndUpdate(
            { _id },
            { $set: { status: "Approved" } }
          );
          await Employee.findByIdAndUpdate(emp_id, {
            $inc: { casualLeaveBalance: -days },
          });

          return { status: "OK", message: "Leave approved successfully" };
        } else {
          return {
            status: "FAILED",
            message: "Insufficient casual leave balance",
          };
        }
      } else if (type == "Sick") {
        if (employeeData && employeeData?.sickLeaveBalance >= days) {
          const approved = await Leave.findOneAndUpdate(
            { _id },
            { $set: { status: "Approved" } }
          );
          await Employee.findByIdAndUpdate(emp_id, {
            $inc: { sickLeaveBalance: -days },
          });
          return { status: "OK", message: "Leave approved successfully" };
        } else {
          return {
            status: "FAILED",
            message: "Insufficient sick leave balance",
          };
        }
      } else {
        const approved = await Leave.findOneAndUpdate(
          { _id },
          { $set: { status: "Approved" } }
        );

        return { status: "OK", message: "Leave approved successfully" };
      }
    } else if (toDo === "reject") {
      const rejected = await Leave.findOneAndUpdate(
        { _id },
        { $set: { status: "Rejected" } }
      );
      return { status: "OK", message: "Leave rejected successfully" };
    } else if (toDo === "cancel") {
      const cancelled = await Leave.findOneAndUpdate(
        { _id },
        { $set: { status: "Cancelled" } }
      );
      if (leaveData?.leaveCategory == "Sick") {
        await Employee.findByIdAndUpdate(emp_id, {
          $inc: { sickLeaveBalance: days },
        });
      } else if (leaveData?.leaveCategory == "Casual") {
        await Employee.findByIdAndUpdate(emp_id, {
          $inc: { casualLeaveBalance: days },
        });
      }

      return { status: "OK", message: "Leave cancelled successfully" };
    }
  } else {
    return null;
  }
};

export const qCancelLeave = async (_id: string) => {
  const response = await Leave.findByIdAndUpdate(_id, {
    $set: { status: "Cancelled" },
  });
  if (response) {
    return { status: "OK", message: "Leave cancelled successfully" };
  }
};
export const qSendLeaveCancelRequest = async (_id: string) => {
  const response = await Leave.findByIdAndUpdate(_id, {
    $set: { status: "Cancellation Requested" },
  });
  if (response) {
    return {
      status: "OK",
      message: "Leave cancellation requested successfully",
    };
  }
};
export const qGetCurrentLeaveStatus = async (_id: string) => {
  const leaveData = await Leave.findById(_id);
  return leaveData?.status;
};

export const qSetTargetByemployeeId = async ( _id:string,data: any) => {
  try {
    const response = await Employee.findOneAndUpdate(
      { _id,  target: { $elemMatch: { month: data.month, year: data.year } }},
      {
        $set: {
          "target.$.target": data.target,
        },
      },
      { new: true }
    );
    console.log("New added target", response);
    if (!response) {
      console.log("PUSH section")
      const response = await Employee.findByIdAndUpdate(
        _id,
        { $push: { target: data } },
        { new: true }
      );
      return response;
    } else {
      return response;
    }
  } catch (error) {
    console.error(error);
  }
};


export const qEditTargetByemployeeId = async ( _id:string,data: any) => {
  try {

    const response = await Employee.findOneAndUpdate(
      { _id, "target.month": data.month, "target.year": data.year },
      {
        $addToSet: {
          "target.$.target": data.target,
          "target.$.notes": data.notes,
        },
      },
      { new: true }
    );
    console.log("New added target", response);
    if (!response) {
      const response = await Employee.findByIdAndUpdate(
        data._id,
        { $push: { target: data } },
        { new: true }
      );
      return response;
    } else {
      return response;
    }
  } catch (error) {
    console.error(error);
  }
};


export const qSetTargetByBranch = async (branch: string, data: any) => {
  try {
    const response = await Employee.updateMany(
      { branch, "target": { $elemMatch: { month: data.month, year: data.year } } },
      {
        $set: {
          "target.$.target": data.target,
        },
      }
    );

    console.log("Updated target", response);

    if (response.modifiedCount === 0) {
      console.log("No matching elements, adding new target");

      const newResponse = await Employee.updateMany(
        { branch },
        { $push: { target: data } }
      );

      return newResponse;
    } else {
      return response;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
