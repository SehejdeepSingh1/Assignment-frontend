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
  selectedPositionId:string="";
  enteredShelfId:string="";
  showUpdateForm:boolean=false;
  message:string='';
  extranumberOfShelfPositions:number=0;
  showShelfForm:Boolean=false;
  shelfPositionId:string='';
  s1:ShelfDefinition=new ShelfDefinition;
  s2:ShelfDefinition=new ShelfDefinition;
  availableShelves:any[]=[];
  filteredShelves:ShelfDefinition[]=[];
  searchShelfText:string='';
  selectedShelfId:string='';


  constructor(private route:ActivatedRoute,
    private deviceService:DeviceService,
    private shelfService:ShelfServices, 
    private cdr:ChangeDetectorRef,
    private router:Router) {
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
        this.shelfPositions.forEach(position => {
          if(position.isOccupied){
            this.returnShelfName(position.id);
          }
        })
        this.cdr.detectChanges()
    });
  }


  updateDevice() {
  console.log("ID : ",this.deviceid);
  this.deviceService.updateDevice(this.deviceid, this.updatedDevice)
    .subscribe({
      next: (response) => {
        console.log("Device updated:", response);
        this.showUpdateForm = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log("Full error object:", error);
      }
    });
}

deleteDevice() {
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

assignShelf(position: any) {
  console.log("assign shelf clicked");
  
  this.selectedPositionId = position.id;
  this.shelfService.getAvailableShelves().subscribe(data => {
    this.availableShelves = data;
    this.filteredShelves = this.availableShelves;
  });
  console.log("Shelf assigned");
  console.log(this.filteredShelves);
  this.cdr.detectChanges();
  
}

submitShelf(position: any) {
  this.shelfService.assignShelf(this.selectedShelfId, position.id)
    .subscribe(() => {
      this.selectedPositionId = "";
      console.log(this.filteredShelves);
      this.loadShelfPositions();
    });
    console.log("Shelf Submitted");
    
}
 
 clearShelf(position:ShelfPosition){
  this.deviceService.unassignShelf(position.id)
  .subscribe(()=>{
    position.shelfName = "";
    this.loadShelfPositions();
    this.cdr.detectChanges(); 
  });
}
 

addShelfPositions(){
  this.deviceService.addShelfPositions(this.deviceid,this.extranumberOfShelfPositions)
  .subscribe({
    next:(response)=>{
      console.log(response);
    }
  })
}

deleteShelfPosition(id: string) {

  const confirmDelete = confirm("Are you sure you want to delete this shelf position ?");
  if(confirmDelete){
    this.deviceService.deleteShelfPosition(id)
    .subscribe({
      next: (response) => {
        console.log(response);
        this.shelfPositions = this.shelfPositions.filter(
          position => position.id !== id
        )
        this.loadDevice();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Delete failed:', error);
      }
    });
  }

}

returnShelfName(id:string){
  this.deviceService.returnShelfName(id)
  .subscribe({
    next:(response:any) =>{
      const position=this.shelfPositions.find(p=>p.id===id);

      if(position){
        position.shelfName=response;
      }
      this.cdr.detectChanges();
    },error:(error)=>{
      console.error("Finding failed", error)
    }
  })
}
 

  toggleUpdateForm(){
    this.showUpdateForm=!this.showUpdateForm;

    if(this.showUpdateForm){
      this.updatedDevice=this.device;
    }
  }
}
