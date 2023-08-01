import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { BaseAPIClass } from '../class/baseAPI.class';

@Injectable({
  providedIn: 'root'
})
export class SerieService extends BaseAPIClass {
  
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = '/series';
  }
  enableSerie(id: number) {
    return this.httpClient.get(this.baseUrl + '/habilitar/' + id);
  }
  
  listar(search: string): Observable<any> {
    return this.httpClient.get<any>(
      this.baseUrl + `?term=${search}`
    );
  }
  getSeriePorMarca(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/h-marca/' + id);
  }
}
