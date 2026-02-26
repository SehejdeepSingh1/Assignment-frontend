import {Component, OnInit} from '@angular/core';
import {Device} from '../../services/device';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-landing',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing implements OnInit{
  devices:Device[]=[];
  showDevices=false;

  constructor(private device:Device) {
  }

  ngOnInit() {
    this.device.getAllDevices().subscribe(data =>{
      console.log("Before : ",this.devices.length);
      this.devices=data;
      console.log("After : ",this.devices.length);
    })
  }

  loadDevices(){
    this.device.getAllDevices().subscribe(data =>{
      this.devices=data;
      this.showDevices=true;
    })
  }
}
