import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminLoginResponse, postResponse } from '../../shared/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AdminAPIService {
  constructor(private http: HttpClient) {}

  login(data: object): Observable<AdminLoginResponse> {
    return this.http.post<AdminLoginResponse>(`/admin-login`, data);
  }
  addBranch(data: object): Observable<postResponse> {
    return this.http.post<postResponse>(`/add-branch`, data);
  }
  editBranch(data: object): Observable<postResponse> {
    return this.http.post<postResponse>(`/edit-branch`, data);
  }
  createActivityType(data: object | null): Observable<postResponse> {
    return this.http.post<postResponse>(`/create-activity-type`, data);
  }

  editActivityType(data: object | null): Observable<postResponse> {
    return this.http.post<postResponse>(`/edit-activity-type`, data);
  }
  deleteActivityType(_id: string | null): Observable<postResponse> {
    return this.http.delete<postResponse>(`/delete-activity-type?_id=${_id}`);
  }

  createProductCategory(data: object | null): Observable<postResponse> {
    return this.http.post<postResponse>(`/create-product-category`, data);
  }

  editProductCategory(data: object | null): Observable<postResponse> {
    return this.http.post<postResponse>(`/edit-product-category`, data);
  }
  deleteProductCategory(_id: string | null): Observable<postResponse> {
    return this.http.delete<postResponse>(`/delete-product-category?_id=${_id}`);
  }
  
  addEmployee(data: object): Observable<postResponse> {
    return this.http.post<postResponse>(`/add-employee`, data);
  }
  
  leaveAction(data: object | null): Observable<postResponse> {
    return this.http.post<postResponse>(`/leave-action`, data);
  }
  
  setTargetByEmpId(data: object | null): Observable<postResponse> {
    return this.http.post<postResponse>(`/create-target`, data);
  }
  
  setBranchTarget(data: object | null): Observable<postResponse> {
    return this.http.post<postResponse>(`/set-branch-target`, data);
  }

  //==================Lead Source=================================

  createLeadSource(data: object | null): Observable<postResponse> {
    return this.http.post<postResponse>(`/create-lead-source`, data);
  }
  
  editLeadSource(data: object | null): Observable<postResponse> {
    return this.http.post<postResponse>(`/edit-lead-source`, data);
  }
  deleteLeadSource(_id: string | null): Observable<postResponse> {
    return this.http.delete<postResponse>(`/delete-lead-source?_id=${_id}`);
  }
}
