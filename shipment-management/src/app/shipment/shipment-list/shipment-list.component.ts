import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Shipment} from '../shipment.model';
import {ShipmentService} from '../shipment.service';
import {AuthService} from '../../auth/auth.service';
import {AuthData} from '../../auth/auth-data.model';

@Component({
  selector: 'app-shipment-list',
  templateUrl: './shipment-list.component.html',
  styleUrls: ['./shipment-list.component.css']
})

export class ShipmentListComponent implements OnInit, OnDestroy{

 shipments: Shipment[] = [];
 workers: AuthData[] = [];
 private shipmentsSub: Subscription;
 private workersSub: Subscription;
 isLoading = false;
 userId: string;
 userType: string;
 userName: string;
 private authStatusSubs: Subscription;
 public userIsAuthenticated = false;

 constructor(public shipmentService: ShipmentService, private authService: AuthService) {}

  ngOnInit() {
    const user = this.authService.getUser();
    this.userId = user.userId;
    this.userType = user.userType;
    this.userName = user.userName;
    this.isLoading = true;
    if(this.userType === 'admin'){
      this.shipmentService.getShipments();
    }
    else if(this.userType === 'worker'){
      this.shipmentService.getUserShipments(this.userName);
    }
    this.shipmentsSub = this.shipmentService.getShipmentUpdateListener()
     .subscribe((shipments: Shipment[]) => {
       this.isLoading = false;
       this.shipments = shipments;
     });
    this.authService.getWorkers();
    this.workersSub = this.authService.getWorkersUpdateListener()
      .subscribe((workers: AuthData[]) => {
        this.workers = workers;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSubs = this.authService
      .getAuthStatusListner()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUser().userId;
      })
  }

  updateShipment(id: string){
      this.shipmentService.updateShipment(id);
  }

  onDelete(shipmentId: string) {
    this.shipmentService.deleteShipment(shipmentId);
  }

  onDeleteWorker(id: string) {
    this.authService.deleteWorker(id);
  }

  openDialog(shipmentId: string){
   this.shipmentService.getShipmentId(shipmentId);
   this.shipmentService.openDialog();
  }
  ngOnDestroy() {
   this.shipmentsSub.unsubscribe();
   this.authStatusSubs.unsubscribe();
  }

}
