import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './models/role';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{




  constructor(private router:Router,private authservice:AuthService){}




  title = 'rolebasedAuth';


  get isAuthorized(){
    return this.authservice.isAuthorized();
  }

  get isAdmin(){
    return this.authservice.hasRole(Role.Admin);
  }

  logout()
  {
    this.authservice.logout();
  
    this.router.navigate(['login']);
  }

}
