import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DeviceService} from '../../services/device-service';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ShelfDefinition} from '../../classes/shelf-definition';
import {DeviceDefinition} from '../../classes/device-definition';
import {ShelfServices} from '../../services/shelf-services';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
  standalone: true
})
export class Landing implements OnInit{
  devices:DeviceDefinition[]=[];
  searchText:string='';
  filteredDevices:any[]=[];
  filteredShelves:any[]=[];
  shelves:ShelfDefinition[]=[];
  showDeviceForm=false;
  showShelfForm=false;
  newDevice: DeviceDefinition = new DeviceDefinition()
  public newShelf:ShelfDefinition = new ShelfDefinition()
  constructor(private deviceService:DeviceService,
            private shelfService:ShelfServices,
            private cdr:ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.loadDevices();
    this.loadShelves();
  }


  onSearch() {

  const text = this.searchText.toLowerCase().trim();

  if (!text) {

    this.filteredDevices = [];

    this.filteredShelves = [];

    return;

  }

  this.filteredDevices = this.devices.filter(d =>

    d.deviceName?.toLowerCase().includes(text)

  );

  this.filteredShelves = this.shelves.filter(s =>

    s.shelfName?.toLowerCase().includes(text)

  );

}
 

  createDevice(){
    this.newDevice.deviceName = this.newDevice.deviceName.trim();
    this.newDevice.partNumber = this.newDevice.partNumber.trim();
    this.newDevice.buildingName = this.newDevice.buildingName.trim();
    this.newDevice.deviceType = this.newDevice.deviceType.trim();
    
    this.deviceService.createDevice(this.newDevice).subscribe({
      next:(response)=> {
        console.log("DeviceService saved to DB :", response);

        this.loadDevices();
        this.showDeviceForm = false;
        this.newDevice = {
          id:'',
          deviceName: '',
          partNumber: '',
          buildingName: '',
          deviceType: '',
          numberOfShelfPositions: 0
        };
      },
      error:(err)=>{
        console.error("Error creating device :",err);
      }
    });
  }

  loadDevices(){
    this.deviceService.getAllDevices().subscribe(data =>{
      this.devices=data;
      this.cdr.detectChanges();
    })
  }

  loadShelves(){
    this.shelfService.getAllShelves().subscribe(data =>{
      this.shelves=data;
      this.cdr.detectChanges();
    })
  }
  createShelf(){
    this.newShelf.shelfName = this.newShelf.shelfName.trim();
    this.newShelf.partNumber = this.newShelf.partNumber.trim();

    this.shelfService.createShelf(this.newShelf).subscribe({
      next:(response)=>{
        console.log("Shelf Service saved to DB : ",response);
        this.loadShelves();
        this.newShelf={
          id:'',
          shelfName:'',
          partNumber:'',
          isOccupied:false
        }
      }
    })
  }
  toggleDeviceCreationForm() {
    this.showDeviceForm=!this.showDeviceForm;
  }
  toggleShelfCreationForm() {
    this.showShelfForm=!this.showShelfForm;
  }
}
