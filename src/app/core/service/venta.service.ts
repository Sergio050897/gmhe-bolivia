import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseAPIClass } from '../class';

@Injectable({
  providedIn: 'root'
})
export class VentaService extends BaseAPIClass{

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = '/ventas';
  }

  getPdf(id: any){
    return this.httpClient.get(
      this.baseUrl + '/pdf/' + id,
      {
        responseType: 'blob',
      }
    );
  }

  getProformaVenta(id: any){
    return this.httpClient.get(this.baseUrl + '/proforma/' + id);
  }
}
