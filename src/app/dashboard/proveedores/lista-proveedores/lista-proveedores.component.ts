import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProveedorService } from 'src/app/core/service/proveedor.service';
import { CrearProveedoresComponent } from '../crear-proveedores/crear-proveedores.component';
import Swal from 'sweetalert2'
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-lista-proveedores',
  templateUrl: './lista-proveedores.component.html',
  styleUrls: ['./lista-proveedores.component.scss']
})
export class ListaProveedoresComponent implements OnInit {

  Proveedores: any;

  modalOptions: NgbModalOptions = {
  };

  BuscarForm = new FormControl('', []);
  currentSearchTerm = '';
  
  constructor(
    private formBuilder: FormBuilder,// trabajar con formularios
    private modalService: NgbModal, // mostrar una ventana emergente modal
    private toastr: ToastrService, // mensajes de confirmacion
    private ProveedorService: ProveedorService) { }

  ngOnInit(): void {
    this.listarProveedores(this.BuscarForm.value);

    this.BuscarForm.valueChanges.pipe(
      debounceTime(300)
    )
    .subscribe(value => 
      this.listarProveedores(value)
    );
  }

  listarProveedores(search: any){
    this.ProveedorService.listar(search).subscribe(
      data => {
        this.Proveedores= data.data;
        console.log(this.Proveedores);
      },
      error=> {
        console.log('Error'+error.error);
      }
    )
  }
  crearProveedor(){

    // abrimos un componente en forma de modal
    const modalRef = this.modalService.open(
     CrearProveedoresComponent,
      this.modalOptions
    );

    // mandamos un mensaje al componente llamado title
    modalRef.componentInstance.titulo = 'Crear Proveedor';

    //atrapamos el mensaje cuando se cierra el modal
    modalRef.result.then(result => {
      if (result) {
        this.listarProveedores(this.currentSearchTerm);
      }
    });

  }
  editModal(id)
  {
    const modalRef = this.modalService.open(
      CrearProveedoresComponent,
       this.modalOptions
     );
 
     // mandamos un mensaje al componente llamado title
     modalRef.componentInstance.id = id;
     modalRef.componentInstance.estado = true;
     modalRef.componentInstance.titulo = 'Editar Proveedor';
     //atrapamos el mensaje cuando se cierra el modal
     modalRef.result.then(result => {
       if (result) {
         this.listarProveedores(this.currentSearchTerm);
       }
     });

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
      
        this.ProveedorService.delete(id).subscribe(
          data => {
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'Su registro ha sido eliminado.',
              'success'
            )
           this.listarProveedores(this.currentSearchTerm);
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
