import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Params } from '@angular/router';
import { CategoriaService } from 'src/app/core/service/categoria.service';
import { ProductoService } from 'src/app/core/service/producto.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  private unsubscribe$ = new Subject();
  categorias$;
  producto:any;

  url:any;
  currentPicture = 0;

  productos:any[] = [];
  imagenes: any;
  constructor(private categoriaServicio:CategoriaService,private productoService:ProductoService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,) { }

  ngOnInit(): void {

    this.url = environment.imgUrl;
    this.route.params
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((params: Params) => {
      this.buscarProducto();
    });
   

  }

  buscarProducto()
  {
    const id = this.route.snapshot.paramMap.get('id');
    this.productoService
    .getProductosWeb(id)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((data) => {
      if (data) {
        this.producto = data;
        console.log(this.producto);
       // this.setupProduct();
       // this.productLoading = false;
      } 
    });

  }

  public createTrustedHtml(blogContent: string) {
    return this.sanitizer.bypassSecurityTrustHtml(blogContent);
 }

 addToCart(product:any) {
  this.productoService.addToCart(product);
}

select(index) {
  this.currentPicture = index;
}

selectArrow() {
  if (this.currentPicture < this.producto.imagenes.length - 1) {
    this.currentPicture++;
  }
}

selectLeftArrow() {
  if (this.currentPicture > 0) {
    this.currentPicture--;
  }
}

}
