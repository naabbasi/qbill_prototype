import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {MenubarModule} from "primeng/menubar";
import {SharedModule} from "../shared/shared.module";
import {ConfirmationService, MessageService} from "primeng/api";


@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MenubarModule,
    SharedModule
  ],
  providers: [MessageService, ConfirmationService]
})
export class AdminModule { }
