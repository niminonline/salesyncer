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
 //============================Activity Types===========================
  
 getActivityTypes(): Observable<any> {
  return this.http.get<any>(`/get-activity-types`);
}



//============================Sales===========================
  getLeadSource(): Observable<any> {
    return this.http.get<any>(`/get-lead-source`);
  }
  getProductCategories(): Observable<any> {
    return this.http.get<any>(`/get-product-categories`);
  }

  //============================Employee===========================
  getEmployeesData(): Observable<any> {
    return this.http.get('/get-employees-data');
  }
  getEmployeeData(_id: string | null): Observable<any> {
    return this.http.get<any>(`/get-employee-data?_id=${_id}`);
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
  getContact(_id:string): Observable<any> {
    return this.http.get<any>(`/get-contact-data?_id=${_id}`);
  }
  editContact(data: object | null): Observable<any> {
    return this.http.post<any>(`/edit-contact`, data);
  }
  deleteContact(_id:string|null): Observable<any> {
    return this.http.delete<any>(`/delete-contact?_id=${_id}`);
  }

  //============================Lead===========================
  createLead(data: object | null): Observable<any> {
    return this.http.post<any>(`/create-lead`, data);
  }
  getLeads(): Observable<any> {
    return this.http.get<any>(`/get-leads`);
  }
  getLead(_id:string|null): Observable<any> {
    return this.http.get<any>(`/get-lead?_id=${_id}`);
  }
  editLead(data: object | null): Observable<any> {
    return this.http.post<any>(`/edit-lead`, data);
  }
  deleteLead(_id:string|null): Observable<any> {
    return this.http.delete<any>(`/delete-lead?_id=${_id}`);
  }
//============================Activity===========================
  createActivity(data: object | null): Observable<any> {
    return this.http.post<any>(`/create-activity`, data);
  }
  getActivities(): Observable<any> {
    return this.http.get<any>(`/get-activities`);
  }
  getActivity(_id:string|null): Observable<any> {
    return this.http.get<any>(`/get-activity?_id=${_id}`);
  }
  editActivity(data: object | null): Observable<any> {
    return this.http.post<any>(`/edit-activity`, data);
  }
  deleteActivity(_id:string|null): Observable<any> {
    return this.http.delete<any>(`/delete-activity?_id=${_id}`);
  }

//============================Product===========================
  createProduct(data: object | null): Observable<any> {
    return this.http.post<any>(`/create-product`, data);
  }
  getProducts(): Observable<any> {
    return this.http.get<any>(`/get-products`);
  }
  getProduct(_id:string|null): Observable<any> {
    return this.http.get<any>(`/get-product?_id=${_id}`);
  }
  editProduct(data: object | null): Observable<any> {
    return this.http.post<any>(`/edit-product`, data);
  }
  deleteProduct(_id:string|null): Observable<any> {
    return this.http.delete<any>(`/delete-product?_id=${_id}`);
  }

 //=======================================================
createSale(data: object | null): Observable<any> {
  return this.http.post<any>(`/create-sale`, data);
}
getSales(): Observable<any> {
  return this.http.get<any>(`/get-sales`);
}
getSale(_id:string|null): Observable<any> {
  return this.http.get<any>(`/get-sale?_id=${_id}`);
}
editSale(data: object | null): Observable<any> {
  return this.http.post<any>(`/edit-sale`, data);
}
deleteSale(_id:string|null): Observable<any> {
  return this.http.delete<any>(`/delete-sale?_id=${_id}`);
}

}
