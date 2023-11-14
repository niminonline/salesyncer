export interface AdminLoginResponse {
  status: string;
  message: string;
  token?: string;
  empEmail?: string;
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

export interface EmployeeType {
  address: {
    addressLine1: string;
    addressLine2: string;
    place: string;
    pincode: Number;
  };
  _id: string;
  empId: string;
  name: string;
  branch: string;
  email: string;
  phone: string;
  role: string;
  designation: string;
  isRemoved: Boolean;
  isBlocked: Boolean;
  leave?: [];
  target?: [];
  attendance?: [];
  __v: 0;
}

export interface LeaveData {
  [x: string]: any;
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

export interface ContactType {
  _id: string;
  contactId: string;
  name: string;
  branch: string;
  email: string;
  phone: string;
  company: string;
  profession: string;
  type: string;
  address: string;
  place: string;
  pincode: string;
  language: string;
}

export interface ContactsType {
  contactsData: ContactType[];
}

export interface Branch {
  _id: string;
  branchCode: string;
  branchName: string;
  location: string;
  empCount: number;

}

export interface BranchData {
  branchData: Branch[];
  status?: string;
  message?: string;
}

