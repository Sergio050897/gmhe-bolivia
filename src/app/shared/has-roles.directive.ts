import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { TokenStorageService } from '../core/authentication/token-storage.service';
import { RolAux, User } from '../core/model/authentication.model';

@Directive({
  selector: '[appHasRoles]'
})
export class HasRolesDirective {
  user: User;

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private tokenStorageService: TokenStorageService
  ) { }

  @Input()
  set appHasRoles(val) {
    // debugger;
    if(val){

      this.user = this.tokenStorageService.getUser();
      // console.log('tokenStorageService',this.user.roles);

      this.user.roles.forEach((rol: RolAux) => {
        val.forEach(data => {
          if (rol.name === data) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            return;
          }
        });
      });

      // if(val[0] === 'administrador'){
      //   this.viewContainer.createEmbeddedView(this.templateRef);
      //   // this.isHidden = true;
      // }else{
      //   this.viewContainer.clear();
      //   // this.isHidden = false;
      // }
      // // console.log(val[0]);

    }
    else{
      // this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
