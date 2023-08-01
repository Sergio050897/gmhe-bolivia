import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/core/service/categoria.service';
import { MarcaService } from 'src/app/core/service/marca.service';
import { ProductoService } from 'src/app/core/service/producto.service';
import { SerieService } from 'src/app/core/service/serie.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  categorias:any;
  productos:any;
  pagination: any;
  page=0;
  series:any;
  marcas :any 
  categoria=0
  serie=0
  marca=0
  search=0
  
  constructor(private categoriaServicio:CategoriaService,private productoService:ProductoService,
              private marcaService: MarcaService, private serieService: SerieService
    ) { }

  ngOnInit(): void { 
    this.Listacategorias();
    this.listarProductos('',this.categoria,this.marca,this.serie);

  }

  Listacategorias(){
   this.categoriaServicio.getEnabledList().subscribe(data=>{
    this.categorias= data;
    console.log('productos',this.categorias);
   });
  }

  Listamarcas(id){
   this.marcaService.getMarcaWeb(id).subscribe(data => {
      this.marcas= data;
      console.log(this.marcas);
      
   })
  }

  Listaseries(id){
    this.serieService.getSeriePorMarca(id).subscribe(data => {
      this.series= data;
      console.log(this.series);
      
    })
  }

  listarProductos(search:any,cate,marca,serie)
  {
    this.productoService.getEnabledListWeb(this.page,search,cate,marca,serie).subscribe(data=>{
      this.productos= data.data;
      this.pagination = data

      console.log("paginador", this.pagination);
    })
  }

  addToCart(product:any) {
    this.productoService.addToCart(product);
  }

  searchEventHandler(searchTerm): void {
    if (searchTerm) {
    //  this.searchClients(searchTerm);
    this.search = searchTerm;
    this.listarProductos(searchTerm,this.categoria,this.marca,this.serie);

     this.listarProductos

    console.log(searchTerm);

    } else {
     // this.loadClientList();
    }
  }

  searchCategoria(id){
      this.categoria =id;
      this.Listamarcas(this.categoria);
      this.listarProductos(this.search,this.categoria,this.marca,this.serie);
      console.log(this.categoria)
  }
  searchMarca(id){
    this.marca = id;
    console.log(this.marca)
    this.Listaseries(id);
    this.listarProductos(this.search,this.categoria,this.marca,this.serie);    
  }
  searchSerie(id){
    this.serie = id;
    console.log(this.serie)
    this.listarProductos(this.search,this.categoria,this.marca,this.serie);    
  }
  OnPaginateNumber(item:any){
    this.page= item    
    console.log('number',item);
    this.listarProductos('',this.categoria,this.marca,this.serie);
  }

  OnNextPage(){
    this.page++;
    if(this.page > this.pagination.last_page){
      this.OnPaginateNumber(this.pagination.last_page)
    }
    this.OnPaginateNumber(this.page)    
    
  }
  previusPage(){
    this.page --;
    if(this.page == 0){
      this.OnPaginateNumber(1)
    }
    this.OnPaginateNumber(this.page)

   
  }

}
