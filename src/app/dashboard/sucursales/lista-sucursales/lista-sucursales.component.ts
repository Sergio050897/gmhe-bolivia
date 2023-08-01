import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SucursalService } from 'src/app/core/service/sucursal.service';
import { CrearSucursalesComponent } from '../crear-sucursales/crear-sucursales.component';
import Swal from 'sweetalert2'
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-lista-sucursales',
  templateUrl: './lista-sucursales.component.html',
  styleUrls: ['./lista-sucursales.component.scss']
})
export class ListaSucursalesComponent implements OnInit {

  Sucursales: any;

  modalOptions: NgbModalOptions = {};

  BuscarForm = new FormControl('', []);
  currentSearchTerm = '';

  constructor(
    private formBuilder: FormBuilder,// trabajar con formularios
    private modalService: NgbModal, // mostrar una ventana emergente modal
    private toastr: ToastrService, // mensajes de confirmacion
    private SucursalService: SucursalService) { }

  ngOnInit(): void {
    this.listarSucursales(this.BuscarForm.value);
    this.BuscarForm.valueChanges.pipe(
      debounceTime(300)
    )
    .subscribe(value => 
      this.listarSucursales(value)
    );
  }

  listarSucursales(search: any){
    // console.log("Cargos");
    this.SucursalService.listar(search).subscribe(
      data => {
        this.Sucursales= data.data;
        console.log(this.Sucursales);
      },
      error=> {
        console.log('Error'+error.error);
      }
    )
  }
  crearSucursal(){

    // abrimos un componente en forma de modal
    const modalRef = this.modalService.open(
     CrearSucursalesComponent,
      this.modalOptions
    );

    // mandamos un mensaje al componente llamado title
    modalRef.componentInstance.titulo = 'Crear Sucursal';

    //atrapamos el mensaje cuando se cierra el modal
    modalRef.result.then(result => {
      if (result) {
        this.listarSucursales(this.currentSearchTerm);
      }
    });

  }
  editModal(id)
  {
    const modalRef = this.modalService.open(
      CrearSucursalesComponent,
       this.modalOptions
     );
 
     // mandamos un mensaje al componente llamado title
     modalRef.componentInstance.id = id;
     modalRef.componentInstance.estado = true;
     modalRef.componentInstance.titulo = 'Editar Sucursal';
     //atrapamos el mensaje cuando se cierra el modal
     modalRef.result.then(result => {
       if (result) {
         this.listarSucursales(this.currentSearchTerm);
       }
     });

  }

  enableSucursal(id: any) {
    this.SucursalService.enableSucursal(id).subscribe(
      (data: any) => {
        // console.log('rol', this.rolSelected, this.currentSearchTerm);
        this.toastr.success(data.succes, 'Éxito');
        this.listarSucursales(this.currentSearchTerm);
        // this.disableScroll = true;
      },
      error => {
        console.log('error ' + error);
        this.toastr.error(error.error, 'Error');
      }
    );
  }
    delete(id: any) {
      console.log(id);
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
        
          this.SucursalService.delete(id).subscribe(
            data => {
              swalWithBootstrapButtons.fire(
                'Eliminado!',
                'Su registro ha sido eliminado.',
                'success'
              )
             this.listarSucursales(this.currentSearchTerm);
            },
            error=> {
              console.log('Error'+error.error);
            }
          )

        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
    }

}
