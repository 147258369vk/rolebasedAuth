import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { Role } from '../models/role';
import { AuthService } from '../Services/auth.service';

@Directive({
  selector: '[appUserRole]'
})
export class UserRoleDirective implements OnInit {

  constructor(
    private templateRef:TemplateRef<any>,
    private authservice:AuthService,
    private viewContainer:ViewContainerRef
  ) { }

    userRoles: Role[] = [];

    @Input()
    set appUserRole(roles : Role[]){
      if(!roles || !roles.length){
        throw new Error('Roles values is empty or missed');
      }
      this.userRoles = roles;
    }


  ngOnInit(){
    let hasAccess = false;
    if(this.authservice.isAuthorized() && this.userRoles){
      hasAccess = this.userRoles.some(r => this.authservice.hasRole(r));
    }

    if(hasAccess){
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
    else
    {
      this.viewContainer.clear();
    }
  }

}
