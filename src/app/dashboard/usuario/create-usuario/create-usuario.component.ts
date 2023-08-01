import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { User } from 'src/app/core/model/authentication.model';
import { SucursalService } from 'src/app/core/service/sucursal.service';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-create-usuario',
  templateUrl: './create-usuario.component.html',
  styleUrls: ['./create-usuario.component.scss']
})
export class CreateUsuarioComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  selectedRols: any[];
  usuario: User;
  rolesAll: any;
  @Input() roles3: any;
  @Input() user: any;
  @Input() title: string;
  @Input() userId: string;
  @Input() estado: boolean;
  isLoading = false;
  modalOptions: NgbModalOptions = {};
  sucursal: any;
  control:any;

  constructor(
    private formBuilder: FormBuilder,
    private basicService: UserService,
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private sucursalService: SucursalService

  ) {
    this.selectedRols = new Array();
    this.modalOptions = {
      size: 'lg',
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
  }

  ngOnInit(): void {
    this.createForm();
    this.llenarRoles();
    this.listSucursal();

    if (this.estado === true) {
      console.log('User id', this.userId);
      this.basicService.getById(this.userId).subscribe(data => {
        // console.log(data);
        this.form.patchValue({
          username: data.username,
          password: '',
          email: data.email,
          nombres: data.nombres,
          apellidos: data.apellidos,
          ci: data.ci,
          celular: data.celular,
          sucursal_id : data.sucursal_id,
          roles: data.roles,
        });
      });
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  listSucursal(){
      this.sucursalService.getEnabledList().subscribe(data => {
        this.sucursal= data;
        console.log(this.sucursal);
      })
  }

  createForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: [''],
      email: ['', [Validators.required, Validators.email]],
      nombres: [
        '',
        [Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]
      ],
      apellidos: [
        '',
        [Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]
      ],
      ci: [''],
      celular: [
        '',
        [
          Validators.required,
          Validators.maxLength(8),
          Validators.pattern('[0-9]*')
        ]
      ],
      sucursal_id:[''],
      roles: this.formBuilder.array([this.crearRol()])
    });
  }

  crearRol(): FormGroup {
    return this.formBuilder.group({
      id: '',
      name: '',
      display_name: '',
      selected: false
    });
  }

  llenarRoles() {
    this.basicService.getAllRoles().subscribe(
      data => {
        this.rolesAll = data;
        const control = <FormArray>this.form.controls['roles'];
        for (let i = 1; i < this.rolesAll.length; i++) {
          control.push(this.crearRol());            
        }

        this.form.patchValue({ roles: this.rolesAll });
      },
      (error: any) => {
        alert('error');
      }
    );
  }

  get roles(): FormArray {
    return this.form.get('roles') as FormArray;
  }
  obtenerRol(item:any,index:number){
    if(index == 3)
     this.control = index;
  }
  registerUser(form: any) {
    this.submitted = true;
    // console.log(this.userId);
    this.isLoading = true;
    if (this.estado === true) {
      this.basicService
        .update(this.userId, form)
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
          }
        );
    }
  }
}
