import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseAPIClass } from '../class';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService extends BaseAPIClass{

  constructor(protected httpClient: HttpClient) {
    // configuraciones/activo
    super(httpClient);
    this.baseUrl = '/configuraciones';
   }
}
