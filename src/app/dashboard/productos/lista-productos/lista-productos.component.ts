import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MonedaService } from 'src/app/core/service/moneda.service';
import { ProductoService } from 'src/app/core/service/producto.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import { CrearProductosComponent } from '../crear-productos/crear-productos.component';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit {

  productos: any;
  modalOptions: NgbModalOptions = {};
  url=environment.imgUrl;
  pagination : any;
  page :0;
  Buscador=new FormControl('', []);
  currentSearchTerm: string;
  moneda: any;

  constructor(
    private productoService: ProductoService,
    private toastr:ToastrService,
    private formBuilder: FormBuilder,
    private monedaService: MonedaService,
  ) {
    this.currentSearchTerm = ' ';
   }

  ngOnInit(): void {
    this.OnPaginateNumber(1);
    this.Buscador.valueChanges.pipe(
      debounceTime(300)
    )
    .subscribe(value =>
      this.listarProductos(value));
   this.listCambioMoneda();
  }

  listarProductos(search: any){
    // console.log("Cargos");
    this.productoService.getPaginate(this.page,search).subscribe(
      data => {
        this.productos= data.data;
        this.pagination = data;
      },
      error=> {
        console.log('Error'+error.error);
      }
    )
  }

  listCambioMoneda(){
    this.monedaService.getAll().subscribe(data=>{
      this.moneda = data;
    },
    error =>{
      console.log('Error' + error.error);
    })
  }

  OnPaginateNumber(item:any){
    this.page= item
    this.listarProductos(this.currentSearchTerm);
  }

  OnNextPage(item){
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
  enableUser(id: any) {
    this.productoService.enableProducto(id).subscribe(
      (data: any) => {
        // console.log('rol', this.rolSelected, this.currentSearchTerm);
        this.toastr.success(data.succes, 'Éxito');

        this.listarProductos(this.currentSearchTerm);
        // this.disableScroll = true;
      },
      error => {
        console.log('error ' + error);
        this.toastr.error(error.error, 'Error');
      }
    );
  }

  delete(id: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: "¡Esta acción no podrá revertirce!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, bórralo!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.delete(id)
        .subscribe(
          data=>{
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'Su registro ha sido eliminado.',
              'success'
            )
            this.listarProductos(this.currentSearchTerm);
          }
        )

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Operación cancelada',
          'La información esta a salvo.',
          'error'
        )
      }
    })
  }
}
