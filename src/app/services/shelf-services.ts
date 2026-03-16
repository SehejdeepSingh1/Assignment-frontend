import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { ShelfDefinition } from '../classes/shelf-definition';

@Injectable({
  providedIn: 'root',
})
export class ShelfServices {
  private shelfurl='http://localhost:8080/api/shelves';
  constructor(private http:HttpClient) {
  }
  createShelf(shelf:any):Observable<any>{
    return this.http.post(`${this.shelfurl}/create`,shelf);
  }

  getAllShelves():Observable<ShelfDefinition[]>{
    return this.http.get<ShelfDefinition[]>(`${this.shelfurl}/getAllShelves`);
  }
  getAvailableShelves():Observable<ShelfDefinition[]>{
    return this.http.get<ShelfDefinition[]>(`${this.shelfurl}/getAvailableShelves`);
  }
  assignShelf(shelfid:string,shelfPositionId:string){
    return this.http.post(`${this.shelfurl}/${shelfid}/assign/${shelfPositionId}`,{},{responseType:'text'});
  }

  updateShelf(id:string,shelf:ShelfDefinition){
    return this.http.put(`${this.shelfurl}/${id}`,shelf);
  }

  deleteShelf(id:string){
    return this.http.delete(`${this.shelfurl}/${id}`);
  }
  
}
