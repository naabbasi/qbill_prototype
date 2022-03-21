import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillTaxTypeRoutingModule } from './bill-tax-type-routing.module';
import { BillTaxTypeListingComponent } from './bill-tax-type-listing/bill-tax-type-listing.component';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import { BillTaxTypeCreateUpdateComponent } from './bill-tax-type-create-update/bill-tax-type-create-update.component';


@NgModule({
  declarations: [
    BillTaxTypeListingComponent,
    BillTaxTypeCreateUpdateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    BillTaxTypeRoutingModule
  ]
})
export class BillTaxTypeModule { }
