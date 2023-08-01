import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseAPIClass } from "../class";

@Injectable({
    providedIn: 'root'
  })

export class SalidasService extends BaseAPIClass  {
    
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = '/salidas';
  }
  
  listar(search: string): Observable<any> {
    return this.httpClient.get<any>(
      this.baseUrl + `?term=${search}`
    );
  }
}