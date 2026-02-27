import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DeviceDefinition} from '../classes/device-definition';


@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private deviceUrl='http://localhost:8080/api/devices'
  private shelfUrl='http://localhost:8080/api/shelf/shelfpositions'

  constructor(private http:HttpClient) {
  }

  getAllDevices():Observable<DeviceDefinition[]>{
    return this.http.get<DeviceDefinition[]>(this.deviceUrl);
  }
  createDevice(device:any):Observable<any>{
    return this.http.post(`${this.deviceUrl}/create`,device);
  }

  getAllShelfPositions(deviceid: string) {
    console.log()
    return this.http.get<any[]>(`${this.shelfUrl}/device/${deviceid}`);
  }
}
