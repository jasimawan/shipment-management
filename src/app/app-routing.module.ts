import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShipmentListComponent} from './shipment/shipment-list/shipment-list.component';
import {ShipmentCreateComponent} from './shipment/shipment-create/shipment-create.component';
import {AuthGuard} from './auth/auth.guard';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';


const routes: Routes = [
  {path: '', component: ShipmentListComponent},
  {path: 'create', component: ShipmentCreateComponent, canActivate: [AuthGuard]},
  {path:"login", component: LoginComponent},
  {path:"signup", component: SignupComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
