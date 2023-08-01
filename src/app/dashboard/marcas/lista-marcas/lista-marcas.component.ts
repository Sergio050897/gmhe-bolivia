import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MarcaService } from 'src/app/core/service/marca.service';
import { CrearMarcasComponent } from '../crear-marcas/crear-marcas.component';
import Swal from 'sweetalert2'
import { environment } from 'src/environments/environment.prod';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-lista-marcas',
  templateUrl: './lista-marcas.component.html',
  styleUrls: ['./lista-marcas.component.scss']
})
export class ListaMarcasComponent implements OnInit {

  Marcas: any;

  modalOptions: NgbModalOptions = {
    
  };

  BuscarForm = new FormControl('', []);
  currentSearchTerm = '';
  
  constructor(
    private formBuilder: FormBuilder,// trabajar con formularios
    private modalService: NgbModal, // mostrar una ventana emergente modal
    private toastr: ToastrService, // mensajes de confirmacion
    private MarcaService: MarcaService) { }

  ngOnInit(): void {
    this.listarMarcas(this.BuscarForm.value);
    this.BuscarForm.valueChanges.pipe(
      debounceTime(300)
    )
    .subscribe(value => 
      this.listarMarcas(value)
    );
  }

  listarMarcas(search: any){
    // console.log("Cargos");
    this.MarcaService.listar(search).subscribe(
      data => {
        this.Marcas= data.data;
        console.log(this.Marcas);
      },
      error=> {
        console.log('Error'+error.error);
      }
    )
  }
  crearMarca(){

    // abrimos un componente en forma de modal
    const modalRef = this.modalService.open(
     CrearMarcasComponent,
      this.modalOptions
    );

    // mandamos un mensaje al componente llamado title
    modalRef.componentInstance.titulo = 'Crear Marca';

    //atrapamos el mensaje cuando se cierra el modal
    modalRef.result.then(result => {
      if (result) {
        this.listarMarcas(this.currentSearchTerm);
      }
    });

  }
  editModal(id)
  {
    const modalRef = this.modalService.open(
      CrearMarcasComponent,
       this.modalOptions
     );
 
     // mandamos un mensaje al componente llamado title
     modalRef.componentInstance.id = id;
     modalRef.componentInstance.estado = true;
     modalRef.componentInstance.titulo = 'Editar Marca';
     //atrapamos el mensaje cuando se cierra el modal
     modalRef.result.then(result => {
       if (result) {
         this.listarMarcas(this.currentSearchTerm);
       }
     });

  }

  enableMarca(id: any) {
    this.MarcaService.enableMarca(id).subscribe(
      (data: any) => {
        // console.log('rol', this.rolSelected, this.currentSearchTerm);
        this.toastr.success(data.succes, 'Éxito');
        this.listarMarcas(this.currentSearchTerm);
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
        
          this.MarcaService.delete(id).subscribe(
            data => {
              swalWithBootstrapButtons.fire(
                'Eliminado!',
                'Su registro ha sido eliminado.',
                'success'
              )
             this.listarMarcas(this.currentSearchTerm);
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
