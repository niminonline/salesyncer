import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from '../config/constants';

@Injectable()
export class MainInterceptor implements HttpInterceptor {
  constructor() {}
  token = localStorage.getItem('token');
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.token) {
      const newRequest = request.clone({
        url: baseUrl + request.url,
        setHeaders: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      
      console.log(newRequest)
      return next.handle(newRequest);
    } else {
      const newRequest = request.clone({
        url: baseUrl + request.url,
      });
      console.log(newRequest)
      return next.handle(newRequest);
    }
  }
}
