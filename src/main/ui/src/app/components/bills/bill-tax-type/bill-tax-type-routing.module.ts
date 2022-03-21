import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BillTaxTypeListingComponent} from "./bill-tax-type-listing/bill-tax-type-listing.component";
import {BillTaxTypeCreateUpdateComponent} from "./bill-tax-type-create-update/bill-tax-type-create-update.component";

const routes: Routes = [
  { path: '', component: BillTaxTypeListingComponent },
  { path: 'create', component: BillTaxTypeCreateUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillTaxTypeRoutingModule { }
