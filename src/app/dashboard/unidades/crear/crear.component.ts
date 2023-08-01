import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { UnidadService } from 'src/app/core/service/unidades.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  @Input() id: string;
  @Input() titulo: string;
  @Input() estado: boolean;
  form: FormGroup;

  isLoading: boolean = false;
  
  constructor(
    public activeModal: NgbActiveModal, 
    private basicService: UnidadService,
    private formBuilder: FormBuilder,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.createForm();
    if (this.estado === true) {
      this.basicService.getById(this.id).subscribe(data => {
        this.form.patchValue({
          nombre: data.nombre,
        });
      });
    }
  }

  createForm() {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
    });
  }

  registerCategoria(form: any) {
    this.isLoading = true;
    if (this.estado === true) {
      this.basicService
      .update(this.id,form)
        .pipe(
          finalize(() => {
            this.form.markAsPristine();
            this.isLoading = false;
          })
        )
        .subscribe(
          data3 => {
            this.toastr.success(data3.succes, 'Éxito');
            this.activeModal.close(data3);
          },
          (error: any) => {
            this.toastr.error(error.error, 'Error');
          }
        );
    } else {
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
            this.toastr.success(data.succes, 'Éxito');
            this.activeModal.close(data);
          },
          (error: any) => {
            this.toastr.error(error.error, 'Error');
            console.log(error);
          }
        );
    }    

  }

}
