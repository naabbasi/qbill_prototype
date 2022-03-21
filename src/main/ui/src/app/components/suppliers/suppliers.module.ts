import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliersRoutingModule } from './suppliers-routing.module';
import { SuppliersComponent } from './suppliers.component';
import { RegisterSupplierComponent } from './register-supplier/register-supplier.component';
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    SuppliersComponent,
    RegisterSupplierComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    SuppliersRoutingModule,
  ]
})
export class SuppliersModule { }
