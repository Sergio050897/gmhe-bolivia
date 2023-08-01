import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SalidasService } from 'src/app/core/service/salidas.service';
import { CrearSueldosComponent } from '../crear-sueldos/crear-sueldos.component';
import Swal from 'sweetalert2'
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-lista-sueldos',
  templateUrl: './lista-sueldos.component.html',
  styleUrls: ['./lista-sueldos.component.scss']
})
export class ListaSueldosComponent implements OnInit {

  Sueldos: any;
  BuscarForm = new FormControl('', []);
  currentSearchTerm = '';

  modalOptions: NgbModalOptions = {
    
  };

  constructor(
    // private formBuilder: FormBuilder,// trabajar con formularios
    private modalService: NgbModal, // mostrar una ventana emergente modal
    // private toastr: ToastrService, // mensajes de confirmacion
    private SalidasService: SalidasService) { }

  ngOnInit(): void {
    this.listarSueldos(this.BuscarForm.value);
    
    this.BuscarForm.valueChanges.pipe(
      debounceTime(300)
    )
    .subscribe(value => 
      this.listarSueldos(value)
    );
  }

  listarSueldos(search: any){
    //  console.log("Sueldos");
    this.SalidasService.listar(search).subscribe(
      data => {
        this.Sueldos= data.data;
        console.log(this.Sueldos);
      },
      error=> {
        console.log('Error'+error.error);
      }
    )
  }
  crearSueldo(){
    // abrimos un componente en forma de modal
    const modalRef = this.modalService.open(
      CrearSueldosComponent,
      this.modalOptions
    );
    // mandamos un mensaje al componente llamado title
    modalRef.componentInstance.titulo = 'Crear Sueldo';
    //atrapamos el mensaje cuando se cierra el modal
    modalRef.result.then(result => {
      if (result) {
        this.listarSueldos(this.currentSearchTerm);
      }
    });

  }
  editModal(id)
  {
    const modalRef = this.modalService.open(
      CrearSueldosComponent,
       this.modalOptions
     );
 
     // mandamos un mensaje al componente llamado title
     modalRef.componentInstance.id = id;
     modalRef.componentInstance.estado = true;
     modalRef.componentInstance.titulo = 'Editar Sueldo';
     //atrapamos el mensaje cuando se cierra el modal
     modalRef.result.then(result => {
       if (result) {
         this.listarSueldos(this.currentSearchTerm);
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
      
        this.SalidasService.delete(id).subscribe(
          data => {
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'Su registro ha sido eliminado.',
              'success'
            )
           this.listarSueldos(this.currentSearchTerm);
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
          'Operación cancelada',
          'La información esta a salvo.',
          'error'
        )
      }
    })
  }

}
