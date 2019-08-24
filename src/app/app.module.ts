import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatSelectModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ShipmentCreateComponent} from './shipment/shipment-create/shipment-create.component';
import {HeaderComponent} from './header/header.component';
import {ShipmentListComponent} from './shipment/shipment-list/shipment-list.component';
import {AssignShipmentComponent} from './shipment/assign-shipment/assign-shipment.component';


@NgModule({
  declarations: [
    AppComponent,
    ShipmentCreateComponent,
    HeaderComponent,
    AssignShipmentComponent,
    ShipmentListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AssignShipmentComponent]
})
export class AppModule { }
