import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import {map} from "rxjs/operators";

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        event = event.clone({body: this.modifyBody(event.body)});
      } else if(event instanceof HttpErrorResponse) {
        console.log('AuthInterceptor: ', event.headers)
      }
      return event;
    }));;
  }

  private modifyBody(body: any) {
  }
}
