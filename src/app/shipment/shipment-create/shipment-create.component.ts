import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ShipmentService} from '../shipment.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Shipment} from '../shipment.model';

@Component({
  selector: 'app-shipment-create',
  templateUrl: './shipment-create.component.html',
  styleUrls: ['./shipment-create.component.css']
})
export class ShipmentCreateComponent implements OnInit{
  isLoading = false;
  private mode = 'create';
  private shipmentId: string;
  shipment: Shipment;


  constructor(public shipmentService: ShipmentService, public route: ActivatedRoute ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('postId')){
        this.mode = 'edit';
        this.shipmentId = paramMap.get('postId');
        this.isLoading = true;
        this.shipmentService.getShipment(this.shipmentId).subscribe(shipmentData => {
          this.isLoading = false;
          this.shipment = {id: shipmentData._id, title: shipmentData.title, content: shipmentData.content};
        });
      }
      else {
        this.mode = 'create';
        this.shipmentId = null;
      }
    });
  }

  onSaveShipment(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if(this.mode=== 'create') {
      this.shipmentService.addShipment(form.value.title, form.value.content);
    }else {
      this.shipmentService.updateShipment(this.shipmentId, form.value.title, form.value.content);
    }
    form.resetForm();
  }
}
