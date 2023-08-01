import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { MonedaService } from 'src/app/core/service/moneda.service';
import { ProductoService } from 'src/app/core/service/producto.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-producto-card',
  templateUrl: './producto-card.component.html',
  styleUrls: ['./producto-card.component.scss']
})
export class ProductoCardComponent implements OnInit {

  @Input() public product: any;
  moneda: any;
  @ViewChild('popoverHook')
  public popoverHook: NgbPopover
  url:any;

  constructor(private productoService:ProductoService,
    private monedaService: MonedaService,
    private sanitizer: DomSanitizer
    ) {}

  ngOnInit(): void {
    this.listCambioMoneda()
    console.log(this.product);
    this.url = environment.imgUrl;

  }

  addToCart(product:any) {
    this.productoService.addToCart(product);
  }

  listCambioMoneda(){
    this.monedaService.getAll().subscribe(data=>{
      this.moneda = data;
    },
    error =>{
      console.log('Error' + error.error);
    })
  }

  openPopover() {
    this.popoverHook.open()
  }

  public createTrustedHtml(blogContent: string) {
    return this.sanitizer.bypassSecurityTrustHtml(blogContent);
 }

}
