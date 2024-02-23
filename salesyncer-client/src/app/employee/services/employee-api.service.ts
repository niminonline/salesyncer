import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmpLoginResponse, postResponse } from 'src/app/shared/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class EmployeeApiService {

  constructor(private http: HttpClient) {}

  login(data: object): Observable<EmpLoginResponse> {
    return this.http.post<EmpLoginResponse>(`/employee-login`, data);
  }
  applyLeave(data: object): Observable<postResponse> {
    return this.http.post<postResponse>(`/apply-leave`, data);
  }
  cancelLeave(_id:string):Observable<postResponse>{
    return this.http.get<postResponse>(`/cancel-leave?_id=${_id}`)
  }

  updatePassword(data: object): Observable<postResponse> {
    return this.http.post<postResponse>(`/update-password`, data);
  }


}
