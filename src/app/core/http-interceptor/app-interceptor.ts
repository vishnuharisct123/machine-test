import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import {Router } from '@angular/router';
import { Injectable } from '@angular/core';
;


@Injectable({
  providedIn: 'root'
})
export class AppHttpInterceptor implements HttpInterceptor {
  requestHeaders;

  constructor(private router: Router) {
    this.requestHeaders = {
      contentType: 'application/json'
    };
  }
  apiUrl:string;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = '';

    this.apiUrl = environment.baseUrl;
     
    if (localStorage.getItem('token')) {
      token = localStorage.getItem('token');
    } else {
      token = '';
    }
    if (token) {
      req = req.clone({ headers: req.headers.set('Authorization', token) });
    }
    // setting the accept header
    return next.handle(req).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
          }
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
       
              this.redirectLogin();
            }
          }
        }
      )
    );
  }

  redirectLogin() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
}
