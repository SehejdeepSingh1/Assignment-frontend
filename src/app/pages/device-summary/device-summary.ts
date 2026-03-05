import {ChangeDetectorRef, Component, NgModule} from '@angular/core';
import {Action} from 'rxjs/internal/scheduler/Action';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {DeviceService} from '../../services/device-service';
import {NgForOf, NgIf} from '@angular/common';
import { DeviceDefinition } from '../../classes/device-definition';
import { FormsModule, NgModel } from '@angular/forms';
import { ShelfPosition } from '../../classes/shelf-position';
import { ShelfDefinition } from '../../classes/shelf-definition';
import { ShelfServices } from '../../services/shelf-services';

@Component({
  selector: 'app-device-summary',
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    FormsModule
  ],
  templateUrl: './device-summary.html',
  styleUrl: './device-summary.css',
  standalone: true
})
export class DeviceSummary{
  deviceid:string='';
  device: DeviceDefinition = new DeviceDefinition;
  updatedDevice:DeviceDefinition=new DeviceDefinition;
  shelfPositions:ShelfPosition[]=[];
  selectedPositionId:string|null=null;
  enteredShelfId:string="";
  showUpdateForm:boolean=false;
  message:string='';
  extranumberOfShelfPositions:number=0;
  showShelfForm:Boolean=false;
  shelfPositionId:string='';

  constructor(private route:ActivatedRoute,private deviceService:DeviceService,private shelfService:ShelfServices, private cdr:ChangeDetectorRef,private router:Router) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.deviceid = id;
      this.loadDevice();
      this.loadShelfPositions();
    } else {
      console.error('Device ID not found in route');
    }
  }
  loadDevice() {
    this.deviceService.getDeviceById(this.deviceid).subscribe({
      next:(data: any)=>{
        this.device=data;
        console.log("Device loaded :",data);
      },
      error:(err: any)=>{
        console.error("Error loading devices",err);
      }
    })
  }

  loadShelfPositions() {
    this.deviceService.getAllShelfPositions(this.deviceid)
      .subscribe(data => {
        console.log(data);
        this.shelfPositions=data
        this.cdr.detectChanges()
    });
  }


  updateDevice() {
  if (!this.deviceid) {
    console.error("Device ID missing");
    return;
  }
  console.log("ID : ",this.deviceid);
  this.deviceService.updateDevice(this.deviceid, this.updatedDevice)
    .subscribe({
      next: (response) => {
        console.log("Device updated:", response);
        this.showUpdateForm = false;
        this.updatedDevice = {
          id:'',
          deviceName: '',
          partNumber: '',
          buildingName: '',
          deviceType: '',
          numberOfShelfPositions: 0
        };
      },
      error: (error) => {
        console.log("Full error object:", error);
      }
 

    });
}

deleteDevice() {
  if (!this.deviceid) {
    console.error("Device ID not found");
    return;
  }
  const confirmDelete = confirm("Are you sure you want to delete this device?");
  if (confirmDelete) {
    this.deviceService.deleteDevice(this.deviceid).subscribe({
      next: (response) => {
        console.log("Device deleted:", response);
      },
      error: (err) => {
        console.error("Error deleting device:", err);
      }
    });
  }
}

assignShelf(position:ShelfPosition){
  this.selectedPositionId=position.id;
  this.enteredShelfId='';
  
}

submitShelf(position: ShelfPosition) {
  if (!this.enteredShelfId) {
    alert("Please enter Shelf ID");
    return;
  }

  let shelfalreadyassigned=position.isOccupied;

  this.shelfService
    .assignShelf(this.enteredShelfId, position.id)
    .subscribe({
      next: (response) => {
        console.log(response);
        alert("Shelf assigned successfully");
        // reset UI
        this.selectedPositionId = null;
        this.enteredShelfId = '';
        position.isOccupied=true;
        // refresh shelf positions if needed
        this.loadShelfPositions();
      },
      error: (err) => {
        console.error("Error assigning shelf:", err);
        if(err.error=="java.lang.RuntimeException: java.lang.RuntimeException: Shelf already assigned to Shelf Position"){
          alert("Shelf already assigned to Shelf Position");
        }
        if(err.error==`com.example.assignment.Exception.ShelfNotFoundException: Shelf not found with id : ${this.enteredShelfId}`){
          alert("Shelf ID not found");
        }
      }
    });
}

addShelfPositions(){
  this.deviceService.addShelfPositions(this.deviceid,this.extranumberOfShelfPositions)
  .subscribe({
    next:(response)=>{
      console.log(response);
      this.extranumberOfShelfPositions=0;
    }
  })
}

deleteShelfPosition(id: string) {

  this.deviceService.deleteShelfPosition(id)

    .subscribe({

      next: (response) => {

        console.log(response);

        // ✅ Remove the deleted item from the array

        this.shelfPositions = this.shelfPositions.filter(

          position => position.id !== id

        );

      },

      error: (error) => {

        console.error('Delete failed:', error);

      }

    });

}
 
viewShelfDetails(){
  this.deviceService
}
 
  toggleUpdateForm(){
    this.showUpdateForm=!this.showUpdateForm;

    if(this.showUpdateForm){
      this.updatedDevice=this.device;
    }
  }
}
