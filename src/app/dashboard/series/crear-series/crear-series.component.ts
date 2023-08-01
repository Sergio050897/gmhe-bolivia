import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SerieService } from 'src/app/core/service/serie.service';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { MarcaService } from 'src/app/core/service/marca.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-crear-series',
  templateUrl: './crear-series.component.html',
  styleUrls: ['./crear-series.component.scss']
})
export class CrearSeriesComponent implements OnInit {

  form: FormGroup;
  //para recibir el mensaje de otro componente
  marca:any;
  @Input() titulo: string;
  @Input() id: string;
  @Input() estado: boolean;
  isLoading = false;

  constructor(
    private basicService:SerieService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private marcaService:MarcaService
  ) { }

  ngOnInit(): void {

    this.createForm();
    this.listMarca()

      if(this.estado == true)
      {
        this.basicService.getById(this.id).subscribe(data => {
          // console.log(data);
          //pathvalue es para rellenar datos existentes al formulario
          this.form.patchValue({
            nombre: data.nombre,
            marca_id: data.marca_id,
          });
        });
      }
  }

  listMarca(){
    this.marcaService.getEnabledList().subscribe(
      data=>{
        this.marca=data;
        console.log("series-marca",this.marca);
      }
    )
  }

  registrarMarca(form: any) {
    this.isLoading = true;

    if(this.estado == true)
    {
      this.basicService
      .createWithFile(this.id, form)
      .pipe(
      finalize(() => {
        this.form.markAsPristine();
        this.isLoading = false;
      })
      )
      .subscribe(
      data => {
        this.toastr.success(data.succes, 'Su registro se actualizo satisfactoriamente!!');
        this.activeModal.close(data);
      },
      (error: any) => {
        this.toastr.error(error.error, 'Error');
      }
      );
      
    }
    else{
      this.basicService
      .create(form)
    .pipe(
      finalize(() => {
        this.form.markAsPristine();
        this.isLoading = false;
      })
    )
    .subscribe(
      data => {
        this.toastr.success(data.succes, 'Su registro se guardo satisfactoriamente!!');
        this.activeModal.close(data);
      },
      (error: any) => {
        this.toastr.error(error.error, 'Error');
      }
    );

    } 
  }

  createForm() {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      marca_id:['',Validators.required]
    });
  }

}
