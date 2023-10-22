import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Branch } from 'src/app/admin/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SharedApiService {

  constructor(private http: HttpClient) {}



  getBranches(): Observable<Branch> {
    return this.http.get<Branch>(`/get-branches`);
  }
}
