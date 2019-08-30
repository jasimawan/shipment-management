import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AuthData} from '../../auth/auth-data.model';
import {Subscription} from 'rxjs';
import {ShipmentService} from '../shipment.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AuthService} from '../../auth/auth.service';


@Component({
  selector: 'app-assign-shipment',
  templateUrl: './assign-shipment.component.html',
  styleUrls: ['./assign-shipment.component.css']
})

export class AssignShipmentComponent implements OnInit, OnDestroy{

  workers : AuthData[] = [];
  private workersSub : Subscription;
  private assignedWorkers = [];

  constructor(public shipmentService: ShipmentService, public authService: AuthService, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.shipmentService.getAssignedWorkers(this.data.toString());
    this.assignedWorkers = this.shipmentService.getAssignedWorkersUpdateListener();
    this.authService.getWorkers();
    this.workersSub = this.authService.getWorkersUpdateListener()
      .subscribe((workers: AuthData[]) => {
        this.workers = workers;
      });

  }

  assignShipment(selectedValue: string){
    this.shipmentService.assignShipment(selectedValue, this.data.toString());
  }

  ngOnDestroy() {
    this.workersSub.unsubscribe();
  }

}


