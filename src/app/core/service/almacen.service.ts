import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseAPIClass } from '../class';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService extends BaseAPIClass{

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = '/almacenes';
  }

  postALmacenPedido(data:any){
    return this.httpClient.post(this.baseUrl + '/ingresar',data)
  }

  searchAlmacen(fechaInicio:any, fechaFin:any):Observable<any>{
    return this.httpClient.get(this.baseUrl + '?fecha_inicio='+fechaInicio+'&fecha_fin='+fechaFin);
  }
}
