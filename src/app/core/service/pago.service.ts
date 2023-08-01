import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseAPIClass } from '../class';

@Injectable({
  providedIn: 'root'
})
export class PagoService extends BaseAPIClass{

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = '/pagos';
  }

  postPagoVenta(data:any):Observable<any>{
    return this.httpClient.post(this.baseUrl + '/venta',data)
  }

}
