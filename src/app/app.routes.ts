import { Routes } from '@angular/router';
import {Landing} from './pages/landing/landing';
import {DeviceSummary} from './pages/device-summary/device-summary';

export const routes: Routes = [
  {path:'',component:Landing},
  {path:'devices/:id/shelves',component:DeviceSummary}
];
