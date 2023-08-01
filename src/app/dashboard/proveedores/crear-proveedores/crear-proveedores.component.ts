import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProveedorService } from 'src/app/core/service/proveedor.service';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-proveedores',
  templateUrl: './crear-proveedores.component.html',
  styleUrls: ['./crear-proveedores.component.scss']
})
export class CrearProveedoresComponent implements OnInit {

  form: FormGroup;
  //para recibir el mensaje de otro componente

  @Input() titulo: string;
  @Input() id: string;
  @Input() estado: boolean;
  isLoading = false;

  constructor(
    private basicService:ProveedorService,
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
          telefono: data.telefono,
          celular: data.celular,
          contacto: data.contacto,
        });
      });
    }
  }

  registrarProveedor(form: any) {
    this.isLoading = true;
    const formData = new FormData();
    formData.append("razon_social",this.form.value.razon_social);
    formData.append("nit",this.form.value.nit);
    formData.append("telefono",this.form.value.telefono);
    formData.append("celular",this.form.value.celular);
    formData.append("contacto",this.form.value.contacto);

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
      razon_social: ['', Validators.required],
      nit: ['', Validators.required],
      telefono: [''],
      celular: ['', Validators.required],
      contacto: ['', Validators.required]
    });
  }

}
