import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'src/app/core/authentication/token-storage.service';
import { CambiarPasswordComponent } from './cambiar-password/cambiar-password.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  usuario: any;

  modalOptions: NgbModalOptions = {
  };
  
  constructor(
    private tokenStorageService: TokenStorageService,
    private modalService: NgbModal

  ) { }

  ngOnInit(): void {
    this.usuario = this.tokenStorageService.getUser();
  }

  editModal(id)
  {
    const modalRef = this.modalService.open(
      CambiarPasswordComponent,
       this.modalOptions
     );
 
     // mandamos un mensaje al componente llamado title
     modalRef.componentInstance.id = id;
     modalRef.componentInstance.estado = true;
     modalRef.componentInstance.titulo = 'Cambiar Contraseña';
     //atrapamos el mensaje cuando se cierra el modal
     modalRef.result.then(result => {
       if (result) {
        //  this.listarSeries();
       }
     });

  }

}
