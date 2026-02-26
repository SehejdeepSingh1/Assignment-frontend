import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Device{
  id:string;
  deviceName:string;
  partNumber:string;
  buildingName:string;
  deviceType:string;
  numberOfShelfPositions:string;
  isDeleted:boolean;
}
@Injectable({
  providedIn: 'root',
})
export class Device {
  private apiUrl='http://localhost:8080/api/devices'

  constructor(private http:HttpClient) {
  }

  getAllDevices():Observable<Device[]>{
    return this.http.get<Device[]>(this.apiUrl);
  }
}
