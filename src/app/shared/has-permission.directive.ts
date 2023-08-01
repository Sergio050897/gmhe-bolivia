import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { TokenStorageService } from '../core/authentication/token-storage.service';
import { RolAux, User } from '../core/model/authentication.model';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective {
  user: User;
  private isHidden = true;

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private tokenStorageService: TokenStorageService
  ) {
    // console.log('template ref', templateRef);
    // console.log('view container', viewContainer);
  }

  @Input()
  set appHasPermission(val) {
    debugger;
    if(val){

      this.user = this.tokenStorageService.getUser();
      // console.log('tokenStorageService',this.user.roles);

      this.user.roles.forEach((rol: RolAux) => {
        rol.permissions.forEach(permission => {
          if (permission.name === val) {
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
      this.viewContainer.clear();
    }
  }
}
