import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShipmentListComponent} from './shipment/shipment-list/shipment-list.component';
import {ShipmentCreateComponent} from './shipment/shipment-create/shipment-create.component';


const routes: Routes = [
  {path: '', component: ShipmentListComponent},
  {path: 'create', component: ShipmentCreateComponent},
  {path: 'edit/:postId', component: ShipmentCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
