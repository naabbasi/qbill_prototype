import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SuppliersComponent} from "./suppliers.component";
import {RegisterSupplierComponent} from "./register-supplier/register-supplier.component";

const routes: Routes = [
  { path: '', component: SuppliersComponent},
  { path: 'register', component: RegisterSupplierComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule { }
