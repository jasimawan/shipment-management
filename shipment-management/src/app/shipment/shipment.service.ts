import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Shipment} from './shipment.model';
import {AuthData} from '../auth/auth-data.model';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {AssignShipmentComponent} from './assign-shipment/assign-shipment.component';

@Injectable({providedIn: 'root'})
export class ShipmentService {
  private shipments: Shipment[] = [];
  shipmentId: string;
  private userName: string;
  private shipmentsUpdated = new Subject<Shipment[]>();
  private assignedWorkers = [];

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog) {}

  addShipment(title:string, content:string){
    const shipment: Shipment={id:null,title: title, content:content,status:null, assignedTo: null};
    this.http.post<{message: string, shipmentId: string}>('http://localhost:3000/api/shipments',shipment)
      .subscribe((responseData) => {
        console.log(responseData.message);
        const id = responseData.shipmentId;
        shipment.id = id;
        this.shipments.push(shipment);
        this.shipmentsUpdated.next([...this.shipments]);
        this.router.navigate(["/"]);
      });
}

  getShipments() {
    this.http.get<{message:string, shipments: any}>('http://localhost:3000/api/shipments')
      .pipe(map((shipmentData) => {
        return shipmentData.shipments.map(shipment => {
          return {
            title: shipment.title,
            content: shipment.content,
            id: shipment._id,
            status: shipment.status,
            assignedTo: shipment.assignedTo
          }
        });
      }))
      .subscribe(transformedShipments => {
        this.shipments = transformedShipments;
        this.shipmentsUpdated.next([...this.shipments])
      });
  }

  getUserShipments(userName: string){
    this.userName = userName;
    const user = {userName: userName};
    this.http.put<{message:string, shipments: any}>("http://localhost:3000/api/shipments/", user )
      .pipe(map((shipmentData) => {
        return shipmentData.shipments.map(shipment => {
          return {
            title: shipment.title,
            content: shipment.content,
            id: shipment._id,
            status: shipment.status,
            assignedTo: shipment.assignedTo
          }
        });
      }))
      .subscribe(transformedShipments => {
        this.shipments = transformedShipments;
        this.shipmentsUpdated.next([...this.shipments])
      })
  }

  getShipmentId(shipmentId : string){
    this.shipmentId = shipmentId;
  }


  getAssignedWorkersUpdateListener() {
    return this.assignedWorkers;
  }

  getShipmentUpdateListener() {
    return this.shipmentsUpdated.asObservable();
  }



  getAssignedWorkers(shipmentId : string) {
    this.http.get<{message: string, assignedTo: any}>("http://localhost:3000/api/shipments/" +shipmentId)
      .subscribe(shipment => {
        this.assignedWorkers = shipment.assignedTo;
      })
  }


  assignShipment(assignTo: string, shipmentId: string){
    const shipment: Shipment= {id: shipmentId, title: null, content: null, status: null, assignedTo: assignTo};
    console.log(shipmentId);
    this.http.put<{message: string, shipmentId: any}>("http://localhost:3000/api/shipments/" + shipmentId,  shipment )
      .subscribe(response => {
        console.log(response);
      });
  }


  openDialog() {
    const dialogRef = this.dialog.open(AssignShipmentComponent, {
      width: '250px',
      data : this.shipmentId
    });
  }


  updateShipment(id: string){
    this.http.get<{message:string, shipments: any}>("http://localhost:3000/api/shipments/update/" + id )
      .subscribe(response => {
        console.log("Status will update after " + response.message + " second");
        setTimeout(() => {
          this.getUserShipments(this.userName);
        }, parseInt(response.message + 2)   *  1000)
      });
  }



  deleteShipment(shipmentId: string) {
    this.http.delete("http://localhost:3000/api/shipments/" + shipmentId)
      .subscribe(() => {
        const updatedShipments = this.shipments.filter(shipment => shipment.id !== shipmentId);
        this.shipments = updatedShipments;
        this.shipmentsUpdated.next([...this.shipments]);
      })
  }

}

