import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Branch } from 'src/app/shared/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SharedApiService {

  constructor(private http: HttpClient) {}



  getBranches(): Observable<Branch> {
    return this.http.get<Branch>(`/get-branches`);
  }

  getEmployeesData():Observable<any>{
    return this.http.get('/get-employees-data');
  }
  getEmployeeData(_id:string|null):Observable<any>{
    return this.http.get<any>(`/get-employee-data?_id=${_id}`);
  }

  updateEmployee(data:object|null):Observable<any>{
    return this.http.post<any>(`/update-employee`,data);
  }
}
