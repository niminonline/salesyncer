
export interface AdminLoginResponse{
    status:string,
    message:string,
    token?:string,
    empEmail?:string
}

export interface Branch{
    branchName:string,
    branchCode:string,
    location:string,
}

export interface LeaveCategoryResponse {
    leaveCategory: LeaveCategory[];
    status: string;
    message: string;
  }
  
  export interface LeaveCategory {
    _id: string;
    category: string;
  }

export interface EmployeeType
    {
        "address": {
            "addressLine1": string,
            "addressLine2": string,
            "place": string,
            "pincode": Number
        },
        "_id": string,
        "empId":string,
        "name": string,
        "branch": string,
        "email": string,
        "phone": string,
        "role": string,
        "designation": string,
        "isRemoved": Boolean,
        "isBlocked": Boolean,
        "leave"?: [],
        "target"?: [],
        "attendance"?: [],
        "__v": 0
    }


    export interface LeaveData {
      leaveData: LeaveItem[];
      status: string;
      message: string;
    }
    
   export interface LeaveItem {
      appliedDate: Date;
      _id: string;
      employeeObj_id: string;
      startDate: Date;
      endDate: Date;
      reason: string;
      leaveCategory: string;
      documents?: any[]; 
      status: string;
     
    }