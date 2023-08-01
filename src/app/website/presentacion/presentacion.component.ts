import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/core/service/producto.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-presentacion',
  templateUrl: './presentacion.component.html',
  styleUrls: ['./presentacion.component.scss']
})
export class PresentacionComponent implements OnInit {
  productos: any;
  url= environment.imgUrl;
  constructor(
    private productoService: ProductoService,
  ) { }

  ngOnInit(): void {
    this.litarProducto();
  }

  litarProducto() {
    this.productoService.getProductoDestacadoList().subscribe(data=>{
      this.productos =data;
      console.log(this.productos);
      
    })
  }

}
