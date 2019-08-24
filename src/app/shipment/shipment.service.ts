import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Shipment} from './shipment.model';
import {User} from '../users/user.Model';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {AssignShipmentComponent} from './assign-shipment/assign-shipment.component';

@Injectable({providedIn: 'root'})
export class ShipmentService {
  private shipments: Shipment[] = [];
  private workers: User[] = [];
  private shipmentsUpdated = new Subject<Shipment[]>();
  private workersUpdated = new Subject<User[]>();

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog) {}

  getShipments() {
    this.http.get<{message:string, shipments: any}>('http://localhost:3000/api/shipments')
      .pipe(map((shipmentData) => {
        return shipmentData.shipments.map(shipment => {
          return {
            title: shipment.title,
            content: shipment.content,
            id: shipment._id
          }
        });
      }))
      .subscribe(transformedShipments => {
        this.shipments = transformedShipments;
        this.shipmentsUpdated.next([...this.shipments])
      });
  }

  getWorkers(){
    this.http.get<{message: string, users: any}>("http://localhost:3000/api/users/")
      .pipe(map((userData) => {
        return userData.users.map(user => {
          return {
            name: user.name,
            content: user.type,
            id: user._id
          }
        });
      }))
      .subscribe(usersData => {
        this.workers = usersData;
        this.workersUpdated.next([...this.workers])
      })


  }

  getWorkersUpdateListener() {
    return this.workersUpdated.asObservable();
  }

  getShipmentUpdateListener() {
    return this.shipmentsUpdated.asObservable();
  }

  getShipment( id: string) {
    return this.http.get<{_id: string, title: string, content: string}>("http://localhost:3000/api/shipments/" + id);
  }

  addShipment(title:string, content:string){
    const shipment: Shipment={id:null,title: title, content:content};
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

  updateShipment(id:string, title: string, content: string) {
      const shipment: Shipment = {id: id, title: title, content: content};
      this.http.put("http://localhost:3000/api/shipments/" + id, shipment)
        .subscribe(response => {
          const updatedShipments = [...this.shipments];
          const oldShipmentIndex = updatedShipments.findIndex(p => p.id === shipment.id);
          updatedShipments[oldShipmentIndex] = shipment;
          this.shipments = updatedShipments;
          this.shipmentsUpdated.next([...this.shipments]);
          this.router.navigate(["/"])
        });
}

  openDialog() {
    const dialogRef = this.dialog.open(AssignShipmentComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The assign-shipment was closed');
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

