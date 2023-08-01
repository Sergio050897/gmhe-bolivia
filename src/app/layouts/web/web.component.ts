import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { TokenStorageService } from 'src/app/core/authentication/token-storage.service';
import { CategoriaService } from 'src/app/core/service/categoria.service';
import { ProductoService } from 'src/app/core/service/producto.service';
import { RegisterComponent } from 'src/app/website/cart/register/register.component';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.scss']
})
export class WebComponent implements OnInit {

  categorias$;

  productos:any[] = [];
  previousSearch: string;

  animatePlop = false;

  showSearch = true;
  url=environment.imgUrl;

  @Output()
  searchChange = new EventEmitter<any>();

  cartProducts: any[];


  constructor(private categoriaServicio:CategoriaService
    ,public productoService:ProductoService
    ,public tokenStorage: TokenStorageService,
    private modalService: NgbModal, 
    private authenticationService: AuthenticationService,
    private tokenStorageService: TokenStorageService ,
    private router : Router,
    private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
    this.previousSearch = '';
    this.categorias$= this.categoriaServicio.getEnabledList();    
    this.getCartProduct();

  }

   onSearchKeyup(search: string) {
    let change = 0;
    if (search.length > this.previousSearch.length) {
      change = 1;
    } else if (search.length < this.previousSearch.length) {
      change = -1;
    }
    this.previousSearch = search;
    if (change !== 0) {
      this.searchChange.emit({search, change});
    }
  }

  // Perform a plop animation on the search icon. This animation is executed on keydown just for visual reasons
  plop() {
    this.animatePlop = true;
    setTimeout(() => {
      this.animatePlop = false;
    }, 110);
  }

  getCartProduct() {
    this.cartProducts = this.productoService.getLocalCartProducts();
  }

  removeCartProduct(product:any)
  {
    this.productoService.removeLocalCartProduct(product);

    // Recalling
    this.getCartProduct();

  }

  registerModal(){
    const modalRef = this.modalService.open(
      RegisterComponent,
      {
        size:'lg'
      }
    );
    modalRef.componentInstance.title = 'Inicia sesión / Regístrate';
    // modalRef.result.then(result => {
    //   if (result) {
    //     this.getCartProduct();
    //   }
    // });
  }
  
  logout(){
    this.authenticationService.logout().subscribe(
      (data: any) => {
        this.tokenStorageService.signOut();
        this.router.navigate(['/inicio']);
        // this.disableScroll = true;
      },
      error => {
        console.log('error ' + error);
        this.toastr.error(error.error, 'Error');
      }
    );
  }




}
