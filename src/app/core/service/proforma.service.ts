import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseAPIClass } from "../class";

@Injectable({
    providedIn: 'root'
  })

export class ProformaService extends BaseAPIClass  {
    
    constructor(protected httpClient: HttpClient) {
        super(httpClient);
        this.baseUrl = '/proformas';
    }

    getAllProformas(term,numero): Observable<any> {
        return this.httpClient.get(this.baseUrl+'?term='+term+'&numero='+numero);
    }
    
    getPdf(id: any){
      return this.httpClient.get(
        this.baseUrl + '/pdf/' + id,
        {
          responseType: 'blob',
        }
      );
    }

    postProformaWeb(data): Observable<any>{
      return this.httpClient.post(this.baseUrl +'/registro',data)
    }    
}