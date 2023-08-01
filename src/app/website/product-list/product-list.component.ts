import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/core/service/categoria.service';
import { ProductoService } from 'src/app/core/service/producto.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productos:any[] = [];
  
  constructor(private categoriaServicio:CategoriaService,private productoService:ProductoService) { }

  ngOnInit(): void {

   
    this.productoService.getEnabledList().subscribe(data=>{
      this.productos=data;
      console.log(this.productos);
    })

  }

  addToCart(product: any) {
    this.productoService.addToCart(product);
  }




}
