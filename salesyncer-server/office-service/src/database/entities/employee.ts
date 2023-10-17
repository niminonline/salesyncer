import mongoose from "mongoose";


const employeeSchema = new mongoose.Schema({
    empId: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
    branchCode: {
      type: String,
    },
    dob: {
      type: Date,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    designation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Designation",
    },
    isRemoved: {
      type: Boolean,
    },
    isBlocked: {
      type: Boolean,
    },
    leave: [{ 
    type: mongoose.Schema.Types.ObjectId,
      ref: "Leave",
     }],
    casualLeaveBalance: {
      type: Number,
    },
    sickLeaveBalance: {
      type: Number,
    },
    joinedDate: {
      type: Date,
    },
    target: [
      {
        month: {
          type: String,
        },
        year: {
          type: Number,
        },
        target: {
          type: Number,
        },
        achieved: {
          type: Number,
        },
        notes: {
          type: String,
        },
      },
    ],
    attendance: [
      {
        date: {
          type: Date,
        },
        punchIn: {
          type: Date,
        },
        punchOut: {
          type: Date,
        },
        totalHours: {
          type: Number,
        },
        shortage: {
          type: Number,
        },
        notes: {
          type: String,
        },
      },
    ],
    address: {
      addressLine1: {
        type: String,
      },
      addressLine2: {
        type: String,
      },
      place: {
        type: String,
      },
      pincode: {
        type: Number,
      },
    },
  });
  
  const Employee = mongoose.model("Employee",employeeSchema);
  
  export default Employee;