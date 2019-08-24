import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../users/user.model';
import {Subscription} from 'rxjs';
import {ShipmentService} from '../shipment.service';


@Component({
  selector: 'app-assign-shipment',
  templateUrl: './assign-shipment.component.html',
  styleUrls: ['./assign-shipment.component.css']
})

export class AssignShipmentComponent implements OnInit, OnDestroy{

  workers : User[] = [];
  private workersSub : Subscription;

  constructor(public shipmentService: ShipmentService) {}

  ngOnInit() {
    this.shipmentService.getWorkers();
    this.workersSub = this.shipmentService.getWorkersUpdateListener()
      .subscribe((workers: User[]) => {
        this.workers = workers;
      });
  }

  ngOnDestroy() {
    this.workersSub.unsubscribe();
  }

}


