import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UnidadService } from 'src/app/core/service/unidades.service';
import Swal from 'sweetalert2';
import { CrearComponent } from '../crear/crear.component';

@Component({
  selector: 'app-unidad',
  templateUrl: './unidad.component.html',
  styleUrls: ['./unidad.component.scss']
})
export class UnidadComponent implements OnInit {
  unidades: any;
  BuscarForm = new FormControl('', []);
  modalOptions: NgbModalOptions = {};

  constructor(
    private unidadService: UnidadService,
    private toastr:ToastrService,
    private modalService : NgbModal,
  ) { }

  ngOnInit(): void {
    this.listarUnidades('');
  }

  listarUnidades(term) {
    this.unidadService.getAllUnidad(term).subscribe(data=>{
      this.unidades= data.data;
      console.log(this.unidades);
      
    })
  }

  crear(){
    const modalRef = this.modalService.open(
      CrearComponent,
      this.modalOptions
    );
    modalRef.componentInstance.titulo = 'Crear Unidad';
    modalRef.result.then((result) => {
      if(result){
          this.listarUnidades('');
      }
    })
  }

  editar(id){
    const modal = this.modalService.open(
      CrearComponent,
      this.modalOptions
    );
    modal.componentInstance.id = id;
    modal.componentInstance.estado = true;
    modal.componentInstance.titulo = 'Editar Unidad';
    modal.result.then(result => {
      if (result) {
        this.listarUnidades('');
      }
    });
  }

  eliminar(id){
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
        this.unidadService.delete(id)
        .subscribe(
          data=>{
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'Su registro ha sido eliminado.',
              'success'
            )
            this.listarUnidades('');

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

  enabled(id){
    this.unidadService.enabled(id).subscribe(
      (data: any) => {
        this.toastr.success(data.succes, 'Éxito');

        this.listarUnidades('');
      },
      error => {
        console.log('error ' + error);
        this.toastr.error(error.error, 'Error');
      }
    );
  }
}
