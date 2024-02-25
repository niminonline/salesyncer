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

// export interface EmployeeType {
//   address: {
//     addressLine1: string;
//     addressLine2: string;
//     place: string;
//     pincode: Number;
//   };
//   _id: string;
//   empId: string;
//   name: string;
//   branch: string;
//   email: string;
//   phone: string;
//   role: string;
//   designation: string;
//   isRemoved: Boolean;
//   isBlocked: Boolean;
//   leave?: [];
//   target?: [];
//   attendance?: [];
//   __v?: 0;
// }

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
  company?: string;
  profession?: string;
  type: string;
  address: string;
  place: string;
  pincode: number;
  language?: string;
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

export interface Client {
  _id: string;
  contactId: string;
  name: string;
  branch: string;
  email: string;
  phone: string;
  profession: string;
  type: string;
  address: string;
  place: string;
  pincode: number;
  language: string;
}

export interface Lead {
  _id: string;
  branch: string;
  client: Client;
  leadId: string;
  type: string;
  source: string;
  owner: string;
  productCategory: string;
  product: string;
  quotedPrice: number;
  status: string;
  notes: string;
  log: string[];
  createdAt: string;
  updatedAt: string;
}

export interface LeadsData {
  leadsData: Lead[];
  status?: string;
  message?: string;
}

export interface LeadSource {
  _id: string;
  leadSource: string;
}

export interface LeadResponse {
  LeadData: Lead;
  status: string;
  message: string;
}

export interface LeadSourceData {
  leadSourceData: LeadSource[];
  status?: string;
  message?: string;
}

export interface Product {
  _id: string;
  productId: string;
  name: string;
  category: string;
  status: string;
  mrp: number;
  lsp: number;
}

export interface ProductsData {
  productsData: Product[];
  status?: string;
  message?: string;
}

export interface ProductData {
  productData: Product;
  status?: string;
  message?: string;
}

export interface ProductCategory {
  _id: string;
  productCategory: string;
}

export interface ProductCategoriesData {
  productCategoriesData: ProductCategory[];
  status?: string;
  message?: string;
}

export interface Activity {
  _id: string;
  lead: Lead;
  activityId: string;
  type: string;
  owner: string;
  status: string;
  scheduledActivity?: string;
  scheduledTime?: string;
  feedback: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActivitiesData {
  activitiesData: Activity[];
  status?: string;
  message?: string;
}
export interface ActivityType {
  _id: string;
  activityType: string;
}

export interface ActivityTypesData {
  activityTypesData: ActivityType[];
  status?: string;
  message?: string;
}

export interface Sale {
  _id: string;
  date: string;
  invoiceNumber: string;
  saleId: string;
  lead: Lead;
  branchName: string;
  employeeName: string;
  amount: number;
  productName: string;
  productCategory: string;
}

export interface SalesData {
  salesData: Sale[];
  status?: string;
  message?: string;
}

export interface SaleData {
  saleData: Sale;
  status?: string;
  message?: string;
}

export interface Address {
  addressLine1: string;
  addressLine2: string;
  place: string;
  pincode: number;
}

export interface Target {
  month: string;
  year: number;
  target: number;
  achieved: number;
  remaining: number;
  notes: string;
  _id: string;
}

export interface Employee {
  _id: string;
  address: Address;
  casualLeaveBalance: number;
  sickLeaveBalance: number;
  empId: string;
  name: string;
  branch: string;
  email: string;
  phone: string;
  role: string;
  leave: any[];
  designation: string;
  isRemoved: boolean;
  isBlocked: boolean;
  target: Target[];
  attendance: any[];
  __v?: 0;
}

export interface EmployeesData {
  employeesData: Employee[];
  status?: string;
  message?: string;
}
export interface EmployeeData {
  employeeData: Employee;
  status?: string;
  message?: string;
}

export interface postResponse {
  status: string;
  message: string;
}

export interface leaveRequestRes {
  leaveRequests: any[];
  status: string;
  message: string;
}

export interface Contact {
  _id: string;
  contactId: string;
  name: string;
  branch: string;
  email: string;
  phone: string;
  profession: string;
  type: string;
  address: string;
  place: string;
  pincode: number;
  language: string;
  __v: number;
}

export interface ContactsResponse {
  contactsData: Contact[];
  status: string;
  message: string;
}

export interface ContactResponse {
  contactsData: Contact;
  status: string;
  message: string;
}

interface ActivityData {
  _id: string;
  lead: {
    _id: string;
    branch: string;
    client: {
      _id: string;
      contactId: string;
      name: string;
      branch: string;
      email: string;
      phone: string;
      profession: string;
      type: string;
      address: string;
      place: string;
      pincode: number;
      language: string;
      __v: number;
    };
    leadId: string;
    type: string;
    source: string;
    owner: string;
    productCategory: string;
    product: string;
    quotedPrice: number;
    status: string;
    notes: string;
    log: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  activityId: string;
  type: string;
  owner: string;
  status: string;
  scheduledActivity: string;
  scheduledTime: string;
  feedback: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ActivityResponse {
  activityData: ActivityData;
  status: string;
  message: string;
}

export interface updateEmpData {
  addressLine1: string;
  addressLine2: string;
  place: string;
  pincode: number;
  name: string;
  branch: string;
  email: string;
  phone: string;
  role: string;
  designation: string;
  _id: string;
}

export interface EmpLoginResponse {
  email?: string;
  _id?: string;
  token?: string;
  status: string;
  message: string;
}

export interface Address {
  addressLine1: string;
  addressLine2: string;
  place: string;
  pincode: number;
}

export interface Target {
  month: string;
  year: number;
  target: number;
  achieved: number;
  remaining: number;
  notes: string;
  _id: string;
}

export interface EmployeeData {
  address: Address;
  _id: string;
  empId: string;
  name: string;
  branch: string;
  email: string;
  phone: string;
  role: string;
  designation: string;
  isRemoved: boolean;
  isBlocked: boolean;
  target: Target[];
  attendance: any[];
  __v: number;
  casualLeaveBalance: number;
  sickLeaveBalance: number;
}

export interface EmployeeDataResponse {
  employeeData: EmployeeData;
  message: string;
  status: string;
}

export interface DecodedJwtToken {
  email: string;
  role: string;
  iat: number;
}
