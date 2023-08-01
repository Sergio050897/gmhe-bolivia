import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { TokenStorageService } from 'src/app/core/authentication/token-storage.service';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Input() title:string;
  form : FormGroup;
  login : FormGroup;
  submitted = false;
  isLoading = false;
  credentials: any;
  viewPassword = false;

  constructor(
    public tokenStorage: TokenStorageService,  
    public userService: UserService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    public formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.loginForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      password: [''],
      email: ['', [Validators.required, Validators.email]],
      nombres: ['',[Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]],
      apellidos: ['',[Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]],
      ci: [''],
      celular: ['',
        [
          Validators.required,
          Validators.maxLength(8),
          Validators.pattern('[0-9]*')
        ]
      ],
      razon_social:[
        '',[Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]
      ],
      direccion: [
        '',
        [Validators.required]
      ]
    });
  }

  loginForm() {
    this.login = this.formBuilder.group({     
      email: ['', [Validators.required]],
      password: ['', Validators.required],
      recuerdame: null
    });
  }

  registerUser(form: any) {
    this.submitted = true;
    // console.log(this.userId);
    this.isLoading = true;
      this.userService
        .userRegisterWeb(form)
        .pipe(
          finalize(() => {
            this.form.markAsPristine();
            this.isLoading = false;
          })
        )
        .subscribe(
          data => {
            this.toastr.success(data.succes, 'Éxito');
            this.credentials = data.data
            this.tokenStorage.saveToken(this.credentials.token);
            this.tokenStorage.saveUser(this.credentials.user);
            this.activeModal.close(data.data);
          },
          (error: any) => {
            this.toastr.error(error.error, 'Error');
          }
        );    
  }

  logIn() {
    console.log('asasdasdasdasd',this.login.value);
    this.isLoading = true;
    this.authenticationService
      .login(this.login.value)
      .pipe(
        finalize(() => {
          this.login.markAsPristine();
          this.isLoading = false;
        })
      )
      .subscribe(
        (data: any) => {
          // console.log('credentials',data.data);
          this.credentials = data.data;

          this.tokenStorage.saveToken(this.credentials.token);
          this.tokenStorage.saveUser(this.credentials.user);

          this.toastr.success('Bienvenido a Madak Store');
          
          if(this.tokenStorage.getUser().roles[0].id == 5){
            this.activeModal.close(data.data);
          }
          else{
            if(this.tokenStorage.getUser().roles[0].id != 5){
              this.activeModal.close(data.data);
              this.router.navigate(['/dashboard/e-commerce']);
            }
          }


        },
        (eror: any) => {
          console.log(eror.error);
          this.toastr.error(eror.error, 'Error');
        }
      );
  }


  changeTypePassword(){
    if(this.viewPassword){
      this.viewPassword = false;
    }else{
      this.viewPassword = true;
    }
  }

}
