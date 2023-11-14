import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Branch,
  LeaveCategoryResponse,
  LeaveCategory,
  LeaveData,
  LeaveItem,
  BranchData,
  ActivityTypesData,
  LeadSourceData,
  ProductCategoriesData,
  EmployeesData,
  EmployeeData,
  LeadsData,
  ActivitiesData,
  ProductsData,
  SalesData,
} from 'src/app/shared/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class SharedApiService {
  constructor(private http: HttpClient) {}

  getBranches(): Observable<BranchData> {
    return this.http.get<BranchData>(`/get-branches`);
  }
  //============================Activity Types===========================

  getActivityTypes(): Observable<ActivityTypesData> {
    return this.http.get<ActivityTypesData>(`/get-activity-types`);
  }

  //============================Lead Source===========================
  getLeadSource(): Observable<LeadSourceData> {
    return this.http.get<LeadSourceData>(`/get-lead-source`);
  }

  //============================Product Catergory===========================
  getProductCategories(): Observable<ProductCategoriesData> {
    return this.http.get<ProductCategoriesData>(`/get-product-categories`);
  }

  //============================Employee===========================
  getEmployeesData(): Observable<EmployeesData> {
    return this.http.get<EmployeesData>('/get-employees-data');
  }
  getEmployeeData(_id: string | null): Observable<EmployeeData> {
    return this.http.get<EmployeeData>(`/get-employee-data?_id=${_id}`);
  }

  updateEmployee(data: object | null): Observable<any> {
    return this.http.post<any>(`/update-employee`, data);
  }

  //============================Leave===========================
  getLeaveCategory(): Observable<LeaveCategoryResponse> {
    return this.http.get<LeaveCategoryResponse>(`/get-leave-category`);
  }
  fetchLeaveData(data: object | null): Observable<LeaveData> {
    return this.http.post<LeaveData>(`/fetch-leave-data`, data);
  }
  leaveRequests(): Observable<any> {
    return this.http.get<any>(`/leave-requests`);
  }

  //============================Contact===========================

  createContact(data: object | null): Observable<any> {
    return this.http.post<any>(`/create-contact`, data);
  }
  getContacts(): Observable<any> {
    return this.http.get<any>(`/get-contacts`);
  }
  getContact(_id: string): Observable<any> {
    return this.http.get<any>(`/get-contact-data?_id=${_id}`);
  }
  editContact(data: object | null): Observable<any> {
    return this.http.post<any>(`/edit-contact`, data);
  }
  deleteContact(_id: string | null): Observable<any> {
    return this.http.delete<any>(`/delete-contact?_id=${_id}`);
  }

  //============================Lead===========================
  createLead(data: object | null): Observable<any> {
    return this.http.post<any>(`/create-lead`, data);
  }
  getLeads(): Observable<LeadsData> {
    return this.http.get<LeadsData>(`/get-leads`);
  }
  getLead(_id: string | null): Observable<any> {
    return this.http.get<any>(`/get-lead?_id=${_id}`);
  }
  editLead(data: object | null): Observable<any> {
    return this.http.post<any>(`/edit-lead`, data);
  }
  deleteLead(_id: string | null): Observable<any> {
    return this.http.delete<any>(`/delete-lead?_id=${_id}`);
  }
  //============================Activity===========================
  createActivity(data: object | null): Observable<any> {
    return this.http.post<any>(`/create-activity`, data);
  }
  getActivities(): Observable<ActivitiesData> {
    return this.http.get<ActivitiesData>(`/get-activities`);
  }
  getActivity(_id: string | null): Observable<any> {
    return this.http.get<any>(`/get-activity?_id=${_id}`);
  }
  editActivity(data: object | null): Observable<any> {
    return this.http.post<any>(`/edit-activity`, data);
  }
  deleteActivity(_id: string | null): Observable<any> {
    return this.http.delete<any>(`/delete-activity?_id=${_id}`);
  }

  //============================Product===========================
  createProduct(data: object | null): Observable<any> {
    return this.http.post<any>(`/create-product`, data);
  }
  getProducts(): Observable<ProductsData> {
    return this.http.get<ProductsData>(`/get-products`);
  }
  getProduct(_id: string | null): Observable<any> {
    return this.http.get<any>(`/get-product?_id=${_id}`);
  }
  editProduct(data: object | null): Observable<any> {
    return this.http.post<any>(`/edit-product`, data);
  }
  deleteProduct(_id: string | null): Observable<any> {
    return this.http.delete<any>(`/delete-product?_id=${_id}`);
  }

  //====================Sale===================================
  createSale(data: object | null): Observable<any> {
    return this.http.post<any>(`/create-sale`, data);
  }
  getSales(): Observable<SalesData> {
    return this.http.get<SalesData>(`/get-sales`);
  }
  getSale(_id: string | null): Observable<any> {
    return this.http.get<any>(`/get-sale?_id=${_id}`);
  }
  editSale(data: object | null): Observable<any> {
    return this.http.post<any>(`/edit-sale`, data);
  }
  deleteSale(_id: string | null): Observable<any> {
    return this.http.delete<any>(`/delete-sale?_id=${_id}`);
  }
}
