import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from 'src/app/core/service/cliente.service';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-clientes',
  templateUrl: './crear-clientes.component.html',
  styleUrls: ['./crear-clientes.component.scss']
})
export class CrearClientesComponent implements OnInit {

  form: FormGroup;
  @Input() titulo: string;
  @Input() id: string;
  @Input() estado: boolean;
  @Output() clienteEvent = new EventEmitter<any>();

  isLoading = false;

  constructor(
    private basicService:ClienteService,
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
          razon_social: data.razon_social,
          nit: data.nit,
          direccion: data.direccion,
          telefono: data.celular
        });
      });
    }
  }

  registrarCliente(form: any) {
    this.isLoading = true;
    const formData = new FormData();
    formData.append("razon_social",this.form.value.razon_social);
    formData.append("nit",this.form.value.nit);
    formData.append("celular",this.form.value.telefono);
    formData.append("direccion",this.form.value.direccion);

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
        this.clienteEvent.emit(form);
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
      razon_social: ['', Validators.required],
      nit: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required]
    });
  }


}
