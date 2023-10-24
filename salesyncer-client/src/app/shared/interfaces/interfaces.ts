
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
