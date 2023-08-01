import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs/operators';
import { CategoriaService } from 'src/app/core/service/categoria.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import { CrearCategoriaComponent } from '../crear-categoria/crear-categoria.component';

@Component({
  selector: 'app-lista-categoria',
  templateUrl: './lista-categoria.component.html',
  styleUrls: ['./lista-categoria.component.scss']
})
export class ListaCategoriaComponent implements OnInit {

  categorias: any;
  modalOptions: NgbModalOptions = {};
  url=environment.imgUrl;

  BuscarForm = new FormControl('', []);
  currentSearchTerm = '';

  constructor(private categoriaService: CategoriaService,
      private modalService : NgbModal, private toastr:ToastrService, private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.listarCategorias(this.BuscarForm.value);

    this.BuscarForm.valueChanges.pipe(
      debounceTime(300)
    )
    .subscribe(value => 
      this.listarCategorias(value)
    );
  }

  listarCategorias(search: any){
    // console.log("Cargos");
    this.categoriaService.listar(search).subscribe(
      data => {
        this.categorias= data.data;
        console.log('categoria',data);
      },
      error=> {
        console.log('Error'+error.error);
      }
    )
  }

  crearCategorias(){
    const modalRef = this.modalService.open(
      CrearCategoriaComponent,
      this.modalOptions
    );
    modalRef.componentInstance.titulo = 'Crear Categoria';
    modalRef.result.then((result) => {
      if(result){
          this.listarCategorias(this.currentSearchTerm);
      }
    })
    
  }

  enableUser(id: any) {
    this.categoriaService.enableCategoria(id).subscribe(
      (data: any) => {
        // console.log('rol', this.rolSelected, this.currentSearchTerm);
        this.toastr.success(data.succes, 'Éxito');

        this.listarCategorias(this.currentSearchTerm);
        // this.disableScroll = true;
      },
      error => {
        console.log('error ' + error);
        this.toastr.error(error.error, 'Error');
      }
    );
  }

  // esMenu(id : any){
  //   this.categoriaService.esMenu(id).subscribe(
  //     (data : any) =>{
  //       this.toastr.success(data.success , 'Exito')
  //       this.listarCategorias();
  //     },
  //     error =>{
  //       console.log('Error' + error);
  //       this.toastr.error(error.error,'Error');
  //     }
  //   );
  // }

  editModal(id: string) {
    console.log(id);
    const modal = this.modalService.open(
      CrearCategoriaComponent,
      this.modalOptions
    );
    modal.componentInstance.categoriaId = id;
    modal.componentInstance.estado = true;
    modal.componentInstance.titulo = 'Editar Categoria';
    modal.result.then(result => {
      if (result) {
        this.listarCategorias(this.currentSearchTerm);
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
        this.categoriaService.delete(id)
        .subscribe(
          data=>{
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'Su registro ha sido eliminado.',
              'success'
            )
            this.listarCategorias(this.currentSearchTerm);
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
