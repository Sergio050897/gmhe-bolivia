import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/core/service/cliente.service';
import { CrearClientesComponent } from '../crear-clientes/crear-clientes.component';
import Swal from 'sweetalert2'
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.scss']
})
export class ListaClientesComponent implements OnInit {

  Clientes: any;

  modalOptions: NgbModalOptions = {
  };

  BuscarForm = new FormControl('', []);
  currentSearchTerm = '';
  
  constructor(
    private formBuilder: FormBuilder,// trabajar con formularios
    private modalService: NgbModal, // mostrar una ventana emergente modal
    private toastr: ToastrService, // mensajes de confirmacion
    private ClienteService: ClienteService) { }

  ngOnInit(): void {
    this.listarClientes(this.BuscarForm.value);

    this.BuscarForm.valueChanges.pipe(
      debounceTime(300)
    )
    .subscribe(value => 
      this.listarClientes(value)
    );
  }

  listarClientes(search: any){
    this.ClienteService.listar(search).subscribe(
      data => {
        this.Clientes= data.data;
        console.log(this.Clientes);
      },
      error=> {
        console.log('Error'+error.error);
      }
    )
  }
  crearCliente(){

    // abrimos un componente en forma de modal
    const modalRef = this.modalService.open(
     CrearClientesComponent,
      this.modalOptions
    );

    // mandamos un mensaje al componente llamado title
    modalRef.componentInstance.titulo = 'Crear Cliente';

    //atrapamos el mensaje cuando se cierra el modal
    modalRef.result.then(result => {
      if (result) {
        this.listarClientes(this.currentSearchTerm);
      }
    });

  }
  editModal(id)
  {
    const modalRef = this.modalService.open(
      CrearClientesComponent,
       this.modalOptions
     );
 
     // mandamos un mensaje al componente llamado title
     modalRef.componentInstance.id = id;
     modalRef.componentInstance.estado = true;
     modalRef.componentInstance.titulo = 'Editar Cliente';
     //atrapamos el mensaje cuando se cierra el modal
     modalRef.result.then(result => {
       if (result) {
         this.listarClientes(this.currentSearchTerm);
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
      
        this.ClienteService.delete(id).subscribe(
          data => {
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'Su registro ha sido eliminado.',
              'success'
            )
           this.listarClientes(this.currentSearchTerm);
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
