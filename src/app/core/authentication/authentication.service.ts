import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor(
    private router: Router,
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {
  }

  login(loginForm: any) {
    return this.http.post<any>(`/token`, loginForm, httpOptions);
  }

  logout() {
    return this.http.get<any>(`/logout`, httpOptions);
  }
}
