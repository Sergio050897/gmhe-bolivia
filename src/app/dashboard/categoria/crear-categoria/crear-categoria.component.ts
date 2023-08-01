import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { CategoriaService } from 'src/app/core/service/categoria.service';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.scss']
})
export class CrearCategoriaComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  isLoading = false;
  @Input() categoriaId: string;
  @Input() titulo: string;
  @Input() estado: boolean;
  url: any;
  imagen: any;

  constructor(
    public activeModal: NgbActiveModal, private basicService: CategoriaService,
    private formBuilder: FormBuilder,private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.createForm();

    if (this.estado === true) {
      console.log('Categoria id', this.categoriaId);
      this.basicService.getById(this.categoriaId).subscribe(data => {
        // console.log(data);
        this.form.patchValue({
          nombre: data.nombre,
          descripcion: data.descripcion,
        });
      });
    }
  }

  createForm() {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion:['', Validators.required],
      img_url: ['', Validators.required]
    });
  }

  registerCategoria(form: any) {
    this.isLoading = true;
    const formData = new FormData();
    formData.append("nombre",this.form.value.nombre);
    formData.append("descripcion",this.form.value.descripcion);
    formData.append("file",this.imagen);

    if (this.estado === true) {
      formData.append("_method", "PUT");
      this.basicService
      .createWithFile(this.categoriaId, formData)
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
        .create(formData)
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
  onSelectFile(event) {
    
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      this.imagen = event.target.files[0]
      reader.onload = (event) => {
        this.url = event.target.result;
      }
    }
  }
}
