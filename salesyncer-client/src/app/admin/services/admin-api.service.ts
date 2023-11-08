import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminLoginResponse } from '../../shared/interfaces/interfaces';


@Injectable({
  providedIn: 'root'
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
  addEmployee(data: object): Observable<any> {
    return this.http.post<any>(`/add-employee`, data);
  }

  leaveAction(data:object|null):Observable<any>{
    return this.http.post<any>(`/leave-action`,data);
  }
 


}
