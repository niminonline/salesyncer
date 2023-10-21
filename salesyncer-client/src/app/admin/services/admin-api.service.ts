import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminLoginResponse } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class AdminAPIService {


  constructor(private http: HttpClient) {}



  login(data: object): Observable<AdminLoginResponse> {
    return this.http.post<AdminLoginResponse>(`/admin-login`, data);
  }

  // loadUsers(headers: HttpHeaders): Observable<UsersApiResponse> {
  //   const options = { headers: headers };

  //   return this.http.get<UsersApiResponse>(`${baseUrlAdmin}/load-users`, options);
  // }

  // deleteUser = (id: string, headers: HttpHeaders): Observable<ApiResponse> => {
  //   const options = { headers: headers };
  //   return this.http.delete<ApiResponse>(
  //     `${baseUrlAdmin}/delete-user/${id}`,
  //     options
  //   );
  // };
  // getEditUserData = (
  //   id: string, 
  //   headers: HttpHeaders
  // ): Observable<ApiResponse> => {
  //   const options = { headers: headers };
  //   return this.http.get<ApiResponse>(
  //     `${baseUrlAdmin}/get-user-data/${id}`,
  //     options
  //   );
  // };
  // updateUser = (
  //   data: object,
  //   headers: HttpHeaders
  // ): Observable<ApiResponse> => {
  //   const options = { headers: headers };
  //   return this.http.put<ApiResponse>(
  //     `${baseUrlAdmin}/update-user`,
  //     data,
  //     options
  //   );
  // };



}
