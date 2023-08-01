import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { BaseAPIClass } from '../class/baseAPI.class';
// import { BaseAPIClass } from '..';
import { Paginated } from '../model/paginated.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends BaseAPIClass {

  constructor(protected httpClient: HttpClient, private toastrService: ToastrService) {
    super(httpClient);
    this.baseUrl = '/productos';
  }

  enableProducto(id: number) {
    return this.httpClient.get(this.baseUrl + '/habilitar/' + id);
  }

  getProductosProveedor(id){
      return this.httpClient.get(this.baseUrl + '/proveedor/'+id);
  }

  getEnabledListWeb(number:any,term:any,cat:any,marca:any,serie:any):Observable<any> {
    return this.httpClient.get(
      this.baseUrl + '/search?page='+number+'&term='+term+'&categoria='+cat+'&marca='+marca+'&serie='+serie
    );
  }

  getProductosStock(id):Observable<any>{
      return this.httpClient.get(this.baseUrl+'/stock/'+id)
  }
  getProductosCodigo():Observable<any>{
    return this.httpClient.get(this.baseUrl+'/codigo')
  }

  getProductosStockVendedor():Observable<any>{
    return this.httpClient.get(this.baseUrl+'/stock');
  }
  // getEsMenu(){
  //   return this.httpClient.get(this.baseUrl + '/menu');
  // }

  // esMenu(id:any){
  //   return this.httpClient.get(this.baseUrl + '/esmenu/'+ id );
  // }

  getProductosWeb(id:any):Observable<any>{
    return this.httpClient.get('/wproductos/' + id);
  }

   getPaginate(number:any, term:any):Observable<any>{
     return this.httpClient.get(this.baseUrl + '?page='+number+'&term='+term);
   }


    // Adding new Product to cart db if logged in else localStorage
  addToCart(data: any): void {
    const a: any[] = JSON.parse(localStorage.getItem("avct_item")) || [];
    a.push(data);

    this.toastrService.show(
      "Añadir producto al carrito",
      "Producto añadido al carrito"
    );
    setTimeout(() => {
      localStorage.setItem("avct_item", JSON.stringify(a));
    }, 500);
  }

  // Removing cart from local
  removeLocalCartProduct(product: any) {
    const products: any[] = JSON.parse(localStorage.getItem("avct_item"));

    console.log(products);

    for (let i = 0; i < products.length; i++) {
      if (products[i].producto_id === product.producto_id) {
        products.splice(i, 1);
        break;
      }
    }
    // ReAdding the products after remove
    localStorage.setItem("avct_item", JSON.stringify(products));
  }

  removeLocalCartAll(){
    const products: any[] = JSON.parse(localStorage.getItem("avct_item"));

    console.log(products);

    for (let i = 0; i < products.length; i++) {
        products.splice(i)
    }
    // ReAdding the products after remove
    localStorage.setItem("avct_item", JSON.stringify(products));
  }

  // Fetching Locat CartsProducts
  getLocalCartProducts(): any[] {
    const products: any[] =
      JSON.parse(localStorage.getItem("avct_item")) || [];

    return products;
  }

  getWebProducto(id):Observable<any>{
      return this.httpClient.get(this.baseUrl+'/publicar-web/'+id)
  }

  getProductoDestacado(id):Observable<any>{
    return this.httpClient.get(this.baseUrl+'/destacar/'+id)
  }

  getProductoDestacadoList():Observable<any>{
      return this.httpClient.get(this.baseUrl+'/destacados');
  }

  medicamentos(){
    return this.httpClient.get(this.baseUrl+'/medicamentos');
  }

}
