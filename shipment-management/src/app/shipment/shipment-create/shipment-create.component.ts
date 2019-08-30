import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ShipmentService} from '../shipment.service';
import {Shipment} from '../shipment.model';

@Component({
  selector: 'app-shipment-create',
  templateUrl: './shipment-create.component.html',
  styleUrls: ['./shipment-create.component.css']
})
export class ShipmentCreateComponent {
  isLoading = false;
  shipment: Shipment;

  constructor(public shipmentService: ShipmentService ) {}

  onSaveShipment(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.shipmentService.addShipment(form.value.title.trim(), form.value.content.trim());
    form.resetForm();

  }
}
