import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DeviceDefinition} from '../classes/device-definition';
import { ShelfPosition } from '../classes/shelf-position';


@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  
  private deviceUrl='http://localhost:8080/api/devices'
  private shelfpositionUrl='http://localhost:8080/api/shelf/shelfpositions'
  private shelfUrl='http://localhost:8080/api/shelves'

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
    return this.http.get<ShelfPosition[]>(`${this.shelfpositionUrl}/device/${deviceid}`);
  }

  getDeviceById(id:string){
    return this.http.get<any>(`${this.deviceUrl}/${id}`);
  }
  updateDevice(id:string, device:any){
    return this.http.put(`${this.deviceUrl}/${id}`,device);
  }

  deleteDevice(id:string){
    return this.http.delete(`${this.deviceUrl}/${id}`,{responseType:'text'});
  }

  assignShelftoShelfPosition(shelfid:string,shelfpositionid:string){
    return this.http.post(`${this.shelfUrl}/${shelfid}/assign/${shelfpositionid}`,shelfid);
  }
}
