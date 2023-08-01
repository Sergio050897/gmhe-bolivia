import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseAPIClass } from "../class";

@Injectable({
    providedIn: 'root'
  })

export class PedidoService extends BaseAPIClass  {
    
    constructor(protected httpClient: HttpClient) {
        super(httpClient);
        this.baseUrl = '/pedidos';
    }
    
    getPdf(id: any){
        return this.httpClient.get(
          this.baseUrl + '/pdf/' + id,
          {
            responseType: 'blob',
          }
        );
    }
}