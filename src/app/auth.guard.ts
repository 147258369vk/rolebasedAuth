import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from './models/role';
import { AuthService } from './Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,CanLoad {

  constructor(
    private router:Router,
    private authservice:AuthService
  ){}




  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(!this.authservice.isAuthorized())
        {
          this.router.navigate(['/login']);
          return false;
        }

        const roles=route.data.roles as Role[];

        if(roles && !roles.some(r=>this.authservice.hasRole(r)))
        {
          this.router.navigate(['error','not-found'])
          // this.router.navigateByUrl('error/not-found');
          return false;

        }
        return true;
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if(!this.authservice.isAuthorized()){
      return false;
    }

    const roles = route.data && route.data.roles  as Role[];
    if(roles && !roles.some(r=>this.authservice.hasRole(r))){
      return false;
    }

    return true;
  }

}
