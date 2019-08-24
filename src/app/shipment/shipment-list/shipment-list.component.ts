import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Shipment} from '../shipment.model';
import {ShipmentService} from '../shipment.service';

@Component({
  selector: 'app-shipment-list',
  templateUrl: './shipment-list.component.html',
  styleUrls: ['./shipment-list.component.css']
})

export class ShipmentListComponent implements OnInit, OnDestroy{

 shipments: Shipment[] = [];
 private shipmentsSub: Subscription;
 isLoading = false;

 constructor(public shipmentService: ShipmentService) {}

  ngOnInit() {
   this.shipmentService.getShipments();
   this.isLoading = true;
   this.shipmentsSub = this.shipmentService.getShipmentUpdateListener()
     .subscribe((shipments: Shipment[]) => {
       this.isLoading = false;
       this.shipments = shipments;
     });
  }
  onDelete(shipmentId: string) {
    this.shipmentService.deleteShipment(shipmentId);
  }
  openDialog(){
   this.shipmentService.openDialog();
  }
  ngOnDestroy() {
   this.shipmentsSub.unsubscribe();
  }

}
