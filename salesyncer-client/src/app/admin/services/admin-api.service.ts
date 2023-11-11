import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminLoginResponse } from '../../shared/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AdminAPIService {
  constructor(private http: HttpClient) {}

  login(data: object): Observable<AdminLoginResponse> {
    return this.http.post<AdminLoginResponse>(`/admin-login`, data);
  }
  addBranch(data: object): Observable<AdminLoginResponse> {
    return this.http.post<AdminLoginResponse>(`/add-branch`, data);
  }
  editBranch(data: object): Observable<AdminLoginResponse> {
    return this.http.post<AdminLoginResponse>(`/edit-branch`, data);
  }
  createActivityType(data: object | null): Observable<any> {
    return this.http.post<any>(`/create-activity-type`, data);
  }

  editActivityType(data: object | null): Observable<any> {
    return this.http.post<any>(`/edit-activity-type`, data);
  }
  deleteActivityType(_id: string | null): Observable<any> {
    return this.http.delete<any>(`/delete-activity-type?_id=${_id}`);
  }

  createProductCategory(data: object | null): Observable<any> {
    return this.http.post<any>(`/create-product-category`, data);
  }

  editProductCategory(data: object | null): Observable<any> {
    return this.http.post<any>(`/edit-product-category`, data);
  }
  deleteProductCategory(_id: string | null): Observable<any> {
    return this.http.delete<any>(`/delete-product-category?_id=${_id}`);
  }

  addEmployee(data: object): Observable<any> {
    return this.http.post<any>(`/add-employee`, data);
  }

  leaveAction(data: object | null): Observable<any> {
    return this.http.post<any>(`/leave-action`, data);
  }

  setTargetByEmpId(data: object | null): Observable<any> {
    return this.http.post<any>(`/create-target`, data);
  }
}
