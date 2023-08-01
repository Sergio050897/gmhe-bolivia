import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { TokenStorageService } from 'src/app/core/authentication/token-storage.service';
import { Credentials } from 'src/app/core/model/authentication.model';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;

  viewPassword = false;

  credentials: Credentials;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private tokenStorage: TokenStorageService,
    private toastr: ToastrService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
      recuerdame: null
    });
  }

  ngOnInit(): void {
  }

  login() {
    console.log('asasdasdasdasd',this.loginForm.value);
    this.isLoading = true;
    this.authenticationService
      .login(this.loginForm.value)
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        })
      )
      .subscribe(
        (data: any) => {
          // console.log('credentials',data.data);
          this.credentials = data.data;

          this.tokenStorage.saveToken(this.credentials.token);
          this.tokenStorage.saveUser(this.credentials.user);

          this.toastr.success('Bienvenido!');

          this.router.navigate(['/dashboard/e-commerce']);
        },
        (eror: any) => {
          console.log(eror.error);
          this.toastr.error(eror.error, 'Error');
        }
      );
  }

  recuerdame(data?: any) {
    // console.log('user', data);
    if (this.loginForm.value.recuerdame) {
      localStorage.setItem('email', data.data.user.username);
    } else {
      localStorage.removeItem('email');
    }
  }

  changeTypePassword(){
    if(this.viewPassword){
      this.viewPassword = false;
    }else{
      this.viewPassword = true;
    }
  }
}
