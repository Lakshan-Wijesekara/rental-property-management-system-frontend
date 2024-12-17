import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthenticationService,
    private messageService: MessageService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 401) {
          console.error('Token expired');
          this.authService.clearToken();
        }

        return throwError(() => new Error('Error!'));
      })
    );
  }
}
