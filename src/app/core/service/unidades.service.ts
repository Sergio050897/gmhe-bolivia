import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { BaseAPIClass } from '../class/baseAPI.class';
// import { BaseAPIClass } from '..';
import { Paginated } from '../model/paginated.model';

@Injectable({
  providedIn: 'root'
})
export class UnidadService extends BaseAPIClass {
  
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = '/unidades';
  }

  enabled(id: number) {
    return this.httpClient.get(this.baseUrl + '/habilitar/' + id);
  }

  getAllUnidad(term): Observable<any> {
    return this.httpClient.get(this.baseUrl + '?term=' + term);
  }

}
