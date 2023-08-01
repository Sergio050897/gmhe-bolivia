import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { BaseAPIClass } from '../class/baseAPI.class';
// import { BaseAPIClass } from '..';
import { Paginated } from '../model/paginated.model';
import { Rol } from '../model/rol.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseAPIClass {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = '/users';
  }

  getAllRoles(): Observable<Rol[]> {
    return this.httpClient.get<Rol[]>(this.baseUrl + '/roles').pipe(
      map(value => {
        console.log(value);
        return value;
      }),
      shareReplay(1)
    );
  }

  getRoles(): Observable<Rol[]> {
    return this.httpClient.get<Rol[]>(this.baseUrl + '/rol');
  }

  enableUser(id: number) {
    return this.httpClient.get(this.baseUrl + '/habilitar/' + id);
  }

  // users/suscripcion/{id}
  

  

  getUsersPaginateNext(next: string): Observable<any> {
    // "http://bkcontrolturno.vaixs.org/public/api/informes/sucursal/3?page=2"
    return this.httpClient.get<any>(next);
  }

  listarUsuarios(rol: string, nombreUser: string): Observable<Paginated> {
    return this.httpClient.get<Paginated>(
      this.baseUrl + `?rol=${rol}&term=${nombreUser}`
    );
  }
  // users/modulos/{id}
  sentPdf(data: any) {
    return this.httpClient.post(this.baseUrl + `/email`, data);
  }

  postChangePassword(data:any):Observable<any>{
    return this.httpClient.post(this.baseUrl + '/change-password',data);
  }

  getVendedores(): Observable<any>{
    return this.httpClient.get(this.baseUrl + '/vendedores');
  }
  
  userRegisterWeb(data): Observable<any>{
    return this.httpClient.post(this.baseUrl + '/register',data);
  }
}

