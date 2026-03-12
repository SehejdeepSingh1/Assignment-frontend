import { Component, OnInit } from '@angular/core';
import { ShelfServices } from '../../services/shelf-services';
import { ShelfDefinition } from '../../classes/shelf-definition';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-shelf-summary',
  imports: [RouterLink,FormsModule,NgIf,NgFor],
  templateUrl: './shelf-summary.html',
  styleUrl: './shelf-summary.css',
})
export class ShelfSummary implements OnInit{

  shelfid:string|null=null;
  updatedShelf:ShelfDefinition=new ShelfDefinition;
  showUpdateForm:Boolean=false;

  constructor(private route:ActivatedRoute,private shelfService:ShelfServices){}

ngOnInit(){
  this.shelfid=this.route.snapshot.paramMap.get('id');
}

openUpdateForm() {

  this.showUpdateForm = true;

}

closeUpdateForm() {

  this.showUpdateForm = false;

}

updateShelf() {
  if (!this.shelfid) {
    console.error("Shelf ID missing");
    return;
  }
  this.shelfService.updateShelf(this.shelfid, this.updatedShelf)
    .subscribe({
      next: (response) => {
        console.log("Shelf updated:", response);
        this.showUpdateForm = false;
        // Reset form
        this.updatedShelf = new ShelfDefinition();
      },
      error: (error) => {
        console.error("Error updating shelf:", error);
      }
    });
}
 

deleteDevice() {
  if (!this.shelfid) {
    console.error("Device ID not found");
    return;
  }
  const confirmDelete = confirm("Are you sure you want to delete this device?");
  if (confirmDelete) {
    this.shelfService.deleteShelf(this.shelfid).subscribe({
      next: (response) => {
        console.log("Device deleted:", response);
      },
      error: (err) => {
        console.error("Error deleting device:", err);
      }
    });
  }
}

}
