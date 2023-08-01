import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SalidasService } from 'src/app/core/service/salidas.service';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-sueldos',
  templateUrl: './crear-sueldos.component.html',
  styleUrls: ['./crear-sueldos.component.scss']
})
export class CrearSueldosComponent implements OnInit {

  form: FormGroup;
  //para recibir el mensaje de otro componente

  @Input() titulo: string;
  @Input() id: string;
  @Input() estado: boolean;
  isLoading = false;


  constructor(
    private basicService:SalidasService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {

    this.createForm();

      if(this.estado == true)
      {
        this.basicService.getById(this.id).subscribe(data => {
          // console.log(data);
          //pathvalue es para rellenar datos existentes al formulario
          this.form.patchValue({
            concepto: data.concepto,
            valor: data.valor,
          });
        });
      }
  }

  registrarSueldo(form: any) {
    this.isLoading = true;
    const formData = new FormData();
    formData.append("concepto",this.form.value.concepto);
    formData.append("valor",this.form.value.valor);

    if(this.estado == true)
    {
      formData.append("_method", "PUT");
      this.basicService
      .createWithFile(this.id, formData)
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
      .create(formData)
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
      concepto: ['', Validators.required],
      valor: ['', Validators.required],
      mes: ['', Validators.required],
      fecha_registro: ['', Validators.required]
    });
  }

}
