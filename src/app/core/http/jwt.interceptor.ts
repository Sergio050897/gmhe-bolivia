import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../authentication/token-storage.service';

@Injectable(
  // {
  //   providedIn: 'root'
  // }
)
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private tokenStorageService: TokenStorageService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: string = this.tokenStorageService.getToken();
    // console.log('asdasdasd',token);

    let request = req;
    // console.log('request',request);

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      });
    }

    return next.handle(request);
  }

}
