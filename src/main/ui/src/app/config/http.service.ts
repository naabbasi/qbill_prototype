import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {MessageService} from "primeng/api";

@Injectable({providedIn: "root"})
export class HttpService<T> {
  protected localStorage = window.localStorage;
  private static messageService: any;

  constructor(private http: HttpClient) {
  }

  //private readonly serviceUrl = `${window.location.origin}/api/`;

  private readonly serviceUrl = `http://localhost:8080/api/`;

  get(url: string, body?: any) : Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': 'ur-PK' }),
      observe: 'response' as 'response',
      withCredentials: true
    };

    return this.http.get(
      `${this.serviceUrl}${url}`, httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  post(url: string, params: any) : Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': 'ur-PK' }),
      observe: 'response' as 'response',
      withCredentials: true
    };

    return this.http.post(
      `${this.serviceUrl}${url}`, params, httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  put(url: string, params: any) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': 'ur-PK' }),
      observe: 'response' as 'response',
      withCredentials: true
    };

    return this.http.put(
      `${this.serviceUrl}${url}`, params, httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  delete(url: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': 'ur-PK' }),
      observe: 'response' as 'response',
      withCredentials: true
    };

    return this.http.delete(
      `${this.serviceUrl}${url}`, httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  sseEvent(sseUrl: string): Observable<string> {
    return new Observable<string>(obs => {
      const es = new EventSource(this.serviceUrl + sseUrl, {withCredentials: true});
      es.addEventListener('message-to-client', (evt) => {

      });
      return () => es.close();
    });
  }

  private handleError(error: HttpErrorResponse) {

    if (error.status === 401) {
      HttpService.messageService.add({
        sticky: false,
        severity: 'info',
        summary: "Authentication Failed",
        detail: `Invalid username or password`
      });
    } else if (error.status === 500) {
      HttpService.messageService.add({
        sticky: true,
        severity: 'error',
        summary: "Http Error",
        detail: `Bad Request - Server can't process the request`
      });
    }

    return throwError(error);
  }

  static messageServiceRef(messageService: MessageService) {
    if(messageService == null) {
      console.error("Please provide the message service object");
    }

    HttpService.messageService = messageService;
  }

  private getServerErrorMessage(error: any): string {
    let errorMessage: string = '';

    switch (error.status) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 401: {
        errorMessage = `Access Denied: ${error.message}`;
        HttpService.messageService.add({sticky: false, severity: 'info', summary: "Login Failed", detail: `Invalid username or password ${errorMessage}`});
        return errorMessage;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }

    }
  }
}
