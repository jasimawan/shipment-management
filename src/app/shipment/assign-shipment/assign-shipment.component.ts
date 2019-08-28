import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AuthData} from '../../auth/auth-data.model';
import {Subscription} from 'rxjs';
import {ShipmentService} from '../shipment.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-assign-shipment',
  templateUrl: './assign-shipment.component.html',
  styleUrls: ['./assign-shipment.component.css']
})

export class AssignShipmentComponent implements OnInit, OnDestroy{

  workers : AuthData[] = [];
  private workersSub : Subscription;
  private assignedWorkers = [];

  constructor(public shipmentService: ShipmentService, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.shipmentService.getAssignedWorkers(this.data.toString());
    this.assignedWorkers = this.shipmentService.getAssignedWorkersUpdateListener();
    this.shipmentService.getWorkers();
    this.workersSub = this.shipmentService.getWorkersUpdateListener()
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


