import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Branch,
  LeaveCategoryResponse,
  LeaveCategory,
  LeaveData,
  LeaveItem,
} from 'src/app/shared/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class SharedApiService {
  constructor(private http: HttpClient) {}

  getBranches(): Observable<Branch> {
    return this.http.get<Branch>(`/get-branches`);
  }

  getEmployeesData(): Observable<any> {
    return this.http.get('/get-employees-data');
  }
  getEmployeeData(_id: string | null): Observable<any> {
    return this.http.get<any>(`/get-employee-data?_id=${_id}`);
  }

  updateEmployee(data: object | null): Observable<any> {
    return this.http.post<any>(`/update-employee`, data);
  }

  getLeaveCategory(): Observable<LeaveCategoryResponse> {
    return this.http.get<LeaveCategoryResponse>(`/get-leave-category`);
  }
  fetchLeaveData(data: object | null): Observable<LeaveData> {
    return this.http.post<LeaveData>(`/fetch-leave-data`, data);
  }
  leaveRequests(): Observable<any> {
    return this.http.get<any>(`/leave-requests`);
  }

  createContact(data: object | null): Observable<any> {
    return this.http.post<any>(`/create-contact`, data);
  }
  getContacts(): Observable<any> {
    return this.http.get<any>(`/get-contacts`);
  }
  getContact(_id:string): Observable<any> {
    return this.http.get<any>(`/get-contact?_id=${_id}`);
  }
  editContat(data: object | null): Observable<any> {
    return this.http.post<any>(`/edit-contact`, data);
  }
}
