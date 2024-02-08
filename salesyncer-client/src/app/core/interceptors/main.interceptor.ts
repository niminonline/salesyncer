import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
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

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    // const apiUrl = environment.apiUrl;
    const apiUrl= baseUrl;
    if (token) {
      const newRequest = request.clone({
        url: apiUrl + request.url,
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      return next.handle(newRequest);
    } else {
      const newRequest = request.clone({
        url: apiUrl + request.url,
      });
      return next.handle(newRequest);
    }
  }
}
