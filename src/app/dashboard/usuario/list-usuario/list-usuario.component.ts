import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/model/authentication.model';
import { Paginated } from 'src/app/core/model/paginated.model';
import { Rol } from 'src/app/core/model/rol.model';
import { UserService } from 'src/app/core/service/user.service';
import { CreateUsuarioComponent } from '../create-usuario/create-usuario.component';
import Swal from 'sweetalert2'
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.scss']
})
export class ListUsuarioComponent implements OnInit {
  form: FormGroup;
  roles2: Rol[];
  editRoles: Rol[];
  users: User[];
  selectedRols: any[];
  usuario: any = {};
  modalOptions: NgbModalOptions = {};
  BuscarForm = new FormControl('', []);
  selectRolForm = new FormControl('', []);
  // paginate: Paginated;
  // loadingScroll: boolean;
  url: string;
  // disableScroll = false;
  currentSearchTerm = '';
  roles$: Observable<any>;
  rolSelected = '';
  countryForm: FormGroup;
  default: string = '';

  // paginate
  paginate: Paginated;
  loadingScroll: boolean;
  disableScroll = false;

  constructor(
    private formBuilder: FormBuilder,
    private basicService: UserService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    // this.selectedRols = new Array();
    // this.roles2 = new Array();
    // this.editRoles = new Array();

    // this.modalOptions = {
    //   backdrop: 'static',
    //   backdropClass: 'customBackdrop'
    // };

    this.rolSelected = ' ';
    this.currentSearchTerm = ' ';

    this.countryForm = new FormGroup({
      selectRolForm: new FormControl(null)
    });
    this.countryForm.controls['selectRolForm'].setValue(this.default, {onlySelf: true});
  }

  ngOnInit(): void {
    // this.roles$ = this.basicService.getAllRoles();
    this.listarUsers(this.selectRolForm.value, this.BuscarForm.value)

    this.BuscarForm.valueChanges.pipe(
      debounceTime(300)
    )
    .subscribe(value => 
      this.listarUsers(this.selectRolForm.value, value)
    );
  }

  changeClassesLevel(id: number) {
    this.listarUsers(id, this.BuscarForm.value)
    // console.log(id);
  }

  // listarRoles() {
  //   this.basicService.getAllRoles().subscribe(
  //     data => {
  //       this.roles2 = data;
  //       console.log('roles:', this.roles2);
  //     },
  //     error => {
  //       console.log('error' + error);
  //     }
  //   );
  // }

  listarUsers(rol: any, search: any) {
    this.loadingScroll = true;
    this.basicService.listarUsuarios(rol, search).subscribe(
      data => {
        this.paginate = data;
        this.users = data.data;
        console.log('data db', data);
        // console.log(this.users);
        this.loadingScroll = false;
      },
      error => {
        console.log('Error' + error.error);
        this.loadingScroll = false;
      }
    );
  }

  // createForm() {
  //   this.userForm = this.formBuilder.group({
  //     username: ['', Validators.required],
  //     password: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     nombres: ['', Validators.required],
  //     apellidos: ['', Validators.required],
  //     ci: ['', Validators.required],
  //     roles: this.buildRoles()
  //   });
  // }

  // get roles() {
  //   return this.userForm.get('roles');
  // }

  // buildRoles() {
  //   const arr = this.roles2.map((rol: any) => {
  //     return this.formBuilder.control(rol.enabled);
  //   });

  //   console.log(arr);
  //   return this.formBuilder.array(arr);
  // }

  enableUser(id: any) {
    this.basicService.enableUser(id).subscribe(
      (data: any) => {
        // console.log('rol', this.rolSelected, this.currentSearchTerm);
        this.toastr.success(data.succes, 'Éxito');

        this.listarUsers(this.rolSelected, this.currentSearchTerm);
        // this.disableScroll = true;
      },
      error => {
        console.log('error ' + error);
        this.toastr.error(error.error, 'Error');
      }
    );
  }

  editModal(id: string) {
    const modal = this.modalService.open(
      CreateUsuarioComponent,
      this.modalOptions
    );
    modal.componentInstance.userId = id;
    modal.componentInstance.estado = true;
    modal.componentInstance.title = 'Editar Cliente';
    modal.result.then(result => {
      if (result) {
        this.listarUsers(this.rolSelected, this.currentSearchTerm);
      }
    });
  }

  createUser() {
    const modalRef = this.modalService.open(
      CreateUsuarioComponent,
      {
        size:'lg'
      }
    );

    modalRef.componentInstance.roles3 = this.roles2;
    modalRef.componentInstance.title = 'Crear Usuario';
    modalRef.result.then(result => {
      if (result) {
        this.listarUsers(this.rolSelected, this.currentSearchTerm);
      }
    });
  }

  // /*  assignModule(id: any) {
  //   const modalRef = this.modalService.open(AssignModuloComponent, this.modalOptions);
  //   modalRef.componentInstance.userId = id;
  //   modalRef.result.then(result => {
  //     if (result) {
  //       this.listarUsers(this.rolSelected, this.currentSearchTerm);
  //     }
  //   });
  // }*/

  // copyEmail(val: string) {
  //   const selBox = document.createElement('textarea');
  //   selBox.style.position = 'fixed';
  //   selBox.style.left = '0';
  //   selBox.style.top = '0';
  //   selBox.style.opacity = '0';
  //   selBox.value = val;
  //   document.body.appendChild(selBox);
  //   selBox.focus();
  //   selBox.select();
  //   document.execCommand('copy');
  //   document.body.removeChild(selBox);
  // }

  // delete(id: any) {
  //   console.log(id);
  //   this.basicService.delete(id).subscribe(
  //     (data: any) => {
  //       // console.log(res);
  //       this.toastr.success(data.succes);
  //       this.listarUsers(this.rolSelected, this.currentSearchTerm);
  //     },
  //     (error: any) => this.toastr.error(error.error, 'Error')
  //   );
  // }

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
        this.basicService.delete(id).subscribe(
          data => {
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'Su registro ha sido eliminado.',
              'success'
            )
            this.listarUsers(this.rolSelected, this.currentSearchTerm);
          },
          error=> {
            console.log('Error'+error.error);
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

  onScroll() {
    console.log('loading :', this.loadingScroll);
    this.loadingScroll = true;
    if (this.loadingScroll) {
      this.loadNext();
      this.disableScroll = true;
    }
  }

  loadNext() {
    if (this.paginate.next_page_url) {
      this.basicService
        .nextPage(this.paginate.next_page_url)
        .subscribe((data: any) => {
          this.paginate = data;
          if (data.next_page_url) {
            this.disableScroll = false;
          }
          this.users = this.users.concat(data.data);
          this.loadingScroll = false;
        });
    } else {
      this.loadingScroll = false;
    }
  }

  onUp() {
    console.log('on up');
  }
}
