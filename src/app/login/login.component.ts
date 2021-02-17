import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../models/role';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Role = Role ;
  constructor(
    private authservice:AuthService,
    private router:Router
  ) { }

  ngOnInit(){
  }

  login(role:Role)
  {
    console.log(role);
    this.authservice.login(role);
    this.router.navigate(['/']);


  }



}
