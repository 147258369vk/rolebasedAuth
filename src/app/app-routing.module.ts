import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { Role } from './models/role';
import { ProfileComponent } from './profile/profile.component';
import { AuthService } from './Services/auth.service';

const routes: Routes = [
  //base routes for login,profile,home

  {
    path:'',
    children:[
      {
        path:'',
        component:HomeComponent
      },
      {
        path:'profile',
        component:ProfileComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'login',
        component:LoginComponent
      }
    ]
  },

  //routes for admin
  {
    path:'admin',
    canLoad:[AuthGuard],
    canActivate:[AuthGuard],
    data:{
      roles:[
        Role.Admin
      ]
    },
    loadChildren:() => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path:'**',
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard,AuthService]
})
export class AppRoutingModule { }
