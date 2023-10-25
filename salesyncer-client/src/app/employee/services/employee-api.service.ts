import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeApiService {

  constructor(private http: HttpClient) {}

  login(data: object): Observable<any> {
    return this.http.post<any>(`/employee-login`, data);
  }
  applyLeave(data: object): Observable<any> {
    return this.http.post<any>(`/apply-leave`, data);
  }


}
