import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { UserService } from '../../core/service/user.service';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.scss']
})
export class CambiarPasswordComponent implements OnInit {

  form: FormGroup;

  @Input() titulo: string;
  @Input() id: string;
  @Input() estado: boolean;
  isLoading = false;
  submitted=false;

  constructor(
    private basicService:UserService,
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
            current_password: data.current_password,
            password: data.password,
          });
        });
      }
  }
  createForm() {
    this.form = this.formBuilder.group({
      current_password: ['', Validators.required],
      password: ['', Validators.required],
      
    });
  }
  registrarCambioPassword(form: any) {
    this.isLoading=true;
    this.submitted=true;
          
    this.basicService.postChangePassword(form)
    .pipe(    
      finalize(() => {
        this.form.markAsPristine();
        this.isLoading=false;
      })
    )
    .subscribe(
      data => {
        this.toastr.success(data.success, 'Éxito');
      },
      (error: any) => {
        this.toastr.error(error.error, 'Error');
      }
    );
  }

}
