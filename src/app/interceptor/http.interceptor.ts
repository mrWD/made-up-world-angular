import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { RequestStatusService } from '../shared/requestStatus.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(private requestStatus: RequestStatusService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      url: `${environment.API_URL}${req.url}`,
      headers: req.headers.set('Content-Type', 'application/json'),
    });

    this.requestStatus.updateRequestCount(true);

    return next.handle(authReq).pipe(
      tap(
        (event) => {},
        (err) => {
          this.requestStatus.addError('Something went wrong!');
        },
      ),
      finalize(() => {
        this.requestStatus.updateRequestCount();
      })
    )
  }
}
