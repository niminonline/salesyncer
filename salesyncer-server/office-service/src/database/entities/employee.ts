import mongoose from "mongoose";


const employeeSchema = new mongoose.Schema({
    empId: {
      type: String,
      required:true
    },
    name: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    
    email: {
      type: String,
      required: true,
    },
  
    phone: {
      type: String,
      required: true,
    },
   
    role: {
      type: String,
    },
    designation: {
      type: String,
    },
    isRemoved: {
      type: Boolean,
      default:false
    },
    isBlocked: {
      type: Boolean,
      default:false
    },
    leave: { 
    type: mongoose.Schema.Types.ObjectId,
      ref: "Leave",
     },
    casualLeaveBalance: {
      type: Number,
      default:12
    },
    sickLeaveBalance: {
      type: Number,
      default:8
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
          default:0
        },
        remaining: {
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