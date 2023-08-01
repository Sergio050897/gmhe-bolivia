import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AlmacenService } from 'src/app/core/service/almacen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-almacen',
  templateUrl: './listar-almacen.component.html',
  styleUrls: ['./listar-almacen.component.scss']
})
export class ListarAlmacenComponent implements OnInit {
  almacenes:any;
  form: FormGroup;
  fechaInicio:string;
  fechaFinal:string;

  constructor(
    private almcenService:AlmacenService,
    private formBuilder: FormBuilder,
  ) {
      this.fechaInicio=' ';
      this.fechaFinal=' ';
  }

  ngOnInit(): void {
    this.fechas();
    this.listarAlmacen(this.fechaInicio,this.fechaFinal);
    this.form.valueChanges.subscribe(data => {
      this.listarAlmacen(data.fecha_inicio,data.fecha_fin);
    })

  }

  fechas() {
    this.form = this.formBuilder.group({
      fecha_inicio: ['',],
      fecha_fin: ['', ]
    });
  }

  listarAlmacen(fecha_inicio: string, fecha_fin: string){
    this.almcenService.searchAlmacen(fecha_inicio,fecha_fin).subscribe(data =>{
      this.almacenes = data.data
      console.log(this.almacenes);
    },
    error =>{
      console.log(error.error);
    })
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
        this.almcenService.delete(id)
        .subscribe(
          data=>{
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'Su archivo fue eliminado.',
              'success'
            )
            this.listarAlmacen(this.fechaInicio,this.fechaFinal);
          }
        )

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Su Registro esta a salvo :)',
          'error'
        )
      }
    })
  }
}
