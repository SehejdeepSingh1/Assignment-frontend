import {Component, OnInit} from '@angular/core';
import {DeviceService} from '../../services/device-service';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ShelfDefinition} from '../../classes/shelf-definition';
import {DeviceDefinition} from '../../classes/device-definition';
import {ShelfServices} from '../../services/shelf-services';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [
    NgIf,
    FormsModule,
    RouterLink
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
  standalone: true
})
export class Landing{
  devices:DeviceDefinition[]=[];
  showDevices=false;
  showForm=false;
  public newDevice: DeviceDefinition = new DeviceDefinition()
  public newShelf:ShelfDefinition = new ShelfDefinition()
  constructor(private deviceService:DeviceService,
              private shelfService:ShelfServices) {
  }

  createDevice(){
    this.deviceService.createDevice(this.newDevice).subscribe({
      next:(response)=> {
        console.log("DeviceService saved to DB :", response);
        this.loadDevices();
        this.showForm = false;
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
      this.showDevices=true;
    })
  }

  createShelf(){
    this.shelfService.createShelf(this.newShelf).subscribe({
      next:(response)=>{
        console.log("Shelf Service saved to DB : ",response);
        this.newShelf={
          id:'',
          shelfName:'',
          partNumber:''
        }
      }
    })
  }
  toggleForm() {
    this.showForm=!this.showForm;
  }
}
