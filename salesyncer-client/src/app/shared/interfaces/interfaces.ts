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

export interface ProductCategory {
  _id: string;
  productCategory: string;
}

export interface ProductCategoriesData {
  productCategoriesData: ProductCategory[];
  status?: string;
  message?: string;
}

export interface ActivityType {
  _id: string;
  activityType: string;
}

// export interface Client {
//   _id: string;
//   contactId: string;
//   name: string;
//   branch: string;
//   email: string;
//   phone: string;
//   profession: string;
//   type: string;
//   address: string;
//   place: string;
//   pincode: number;
//   language: string;
// }

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

interface ActivityTypesData {
  activityTypes: ActivityType[];
  status?: string;
  message?: string;
}
