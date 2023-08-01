import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SerieService } from 'src/app/core/service/serie.service';
import { CrearSeriesComponent } from '../crear-series/crear-series.component';
import Swal from 'sweetalert2'
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-lista-series',
  templateUrl: './lista-series.component.html',
  styleUrls: ['./lista-series.component.scss']
})
export class ListaSeriesComponent implements OnInit {

  Series: any;

  modalOptions: NgbModalOptions = {
    
  };

  BuscarForm = new FormControl('', []);
  currentSearchTerm = '';
  
  constructor(
    private formBuilder: FormBuilder,// trabajar con formularios
    private modalService: NgbModal, // mostrar una ventana emergente modal
    private toastr: ToastrService, // mensajes de confirmacion
    private SerieService: SerieService) { }

  ngOnInit(): void {
    this.listarSeries(this.BuscarForm.value);
    this.BuscarForm.valueChanges.pipe(
      debounceTime(300)
    )
    .subscribe(value => 
      this.listarSeries(value)
    );
  }

  listarSeries(search: any){
    // console.log("Cargos");
    this.SerieService.listar(search).subscribe(
      data => {
        this.Series= data.data;
        console.log(this.Series);
      },
      error=> {
        console.log('Error'+error.error);
      }
    )
  }
  crearSerie(){

    // abrimos un componente en forma de modal
    const modalRef = this.modalService.open(
     CrearSeriesComponent,
      this.modalOptions
    );

    // mandamos un mensaje al componente llamado title
    modalRef.componentInstance.titulo = 'Crear Serie';

    //atrapamos el mensaje cuando se cierra el modal
    modalRef.result.then(result => {
      if (result) {
        this.listarSeries(this.currentSearchTerm);
      }
    });

  }
  editModal(id)
  {
    const modalRef = this.modalService.open(
      CrearSeriesComponent,
       this.modalOptions
     );
 
     // mandamos un mensaje al componente llamado title
     modalRef.componentInstance.id = id;
     modalRef.componentInstance.estado = true;
     modalRef.componentInstance.titulo = 'Editar Serie';
     //atrapamos el mensaje cuando se cierra el modal
     modalRef.result.then(result => {
       if (result) {
         this.listarSeries(this.currentSearchTerm);
       }
     });

  }

  enableSerie(id: any) {
    this.SerieService.enableSerie(id).subscribe(
      (data: any) => {
        // console.log('rol', this.rolSelected, this.currentSearchTerm);
        this.toastr.success(data.succes, 'Éxito');
        this.listarSeries(this.currentSearchTerm);
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
        
          this.SerieService.delete(id).subscribe(
            data => {
              swalWithBootstrapButtons.fire(
                'Eliminado!',
                'Su registro ha sido eliminado.',
                'success'
              )
             this.listarSeries(this.currentSearchTerm);
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
