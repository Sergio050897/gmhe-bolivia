import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptor implements HttpInterceptor {

  constructor(
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // if (request.headers.get('paginate')) {
    //   request = request.clone({ url: '' });
    // } else {
      request = request.clone({ url: environment.serverBaseUrl + request.url });
    // }

    return next.handle(request);

  }
}
