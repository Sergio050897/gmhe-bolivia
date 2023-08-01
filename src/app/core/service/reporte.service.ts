import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseAPIClass } from '../class';

@Injectable({
  providedIn: 'root'
})
export class ReporteService extends BaseAPIClass{

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = '/reportes';
  }

  getStock(id:any,cantidad: any, term): Observable<any>{
    return this.httpClient.get(this.baseUrl + '/stocks?sucursal_id='+id+'&cantidad='+cantidad+'&term='+term);
  }
  getVendedor(term): Observable<any>{
    return this.httpClient.get(this.baseUrl + '/usuarios-ventas?&term='+term);
  }

  getProforma(term:any,cliente_id: any, usuario_id: any,filter: any, fecha: any,): Observable<any>{
    return this.httpClient.get(this.baseUrl + '/proformas?term='+term
                              +'&cliente_id='+cliente_id
                              +'&usuario_id='+usuario_id
                              +'&filter='+filter
                              +'&fecha='+fecha);
  }

  getYear(): Observable<any>{
    return this.httpClient.get(this.baseUrl+'/years');
  }

  getPdf(term:any,cliente_id: any, usuario_id: any,filter: any, fecha: any,): Observable<any>{
    return this.httpClient.get(this.baseUrl + '/proformas-pdf?term='+term
                              +'&cliente_id='+cliente_id
                              +'&usuario_id='+usuario_id
                              +'&filter='+filter
                              +'&fecha='+fecha,{
                                responseType: 'blob',
                              });
  }
  clientesDeudores(): Observable<any>{
    return this.httpClient.get(this.baseUrl+'/deudas')
  }

  // ventasDeudores(id): Observable<any>{
  //   return this.httpClient.get(this.baseUrl+'/deudas/venta/'+id)
  // }
  ventasDeudores(id): Observable<any>{
    return this.httpClient.get(this.baseUrl+'/deudas/cliente/'+id)
  }

  ventaProductos(term,filter,fecha): Observable<any>{
    return this.httpClient.get(this.baseUrl+'/ventas-productos?term='+term+'&filter='+filter+'&fecha='+fecha);
  }

  reportesPDF(term,id:any,cantidad: any): Observable<any>{
    return this.httpClient.get(this.baseUrl+'/stocks-pdf?term='+term+'&sucursal_id='+id+'&cantidad='+cantidad,{responseType:'blob'})
  }
  vendedoresPDF(term): Observable<any>{
    return this.httpClient.get(this.baseUrl+'/usuarios-ventas-pdf?&term='+term,{responseType:'blob'})
  }
  ventasPDF(term,filter, fecha): Observable<any>{
    return this.httpClient.get(this.baseUrl+'/ventas-productos-pdf?term='+term+'&filter='+filter+'&fecha='+fecha,{responseType:'blob'})
  }
  ingresosPDF(term,fecha_inicio, fecha_fin): Observable<any>{
    return this.httpClient.get(this.baseUrl+'/ingresos-pdf?term='+term+'&fecha_inicio='+fecha_inicio+'&fecha_fin='+fecha_fin,{responseType:'blob'})
  }
  searchIngresos(term,fecha_inicio, fecha_fin):Observable<any>{
    return this.httpClient.get(this.baseUrl + '/ingresos?term='+term+'&fecha_inicio='+fecha_inicio+'&fecha_fin='+fecha_fin);
  }
}
