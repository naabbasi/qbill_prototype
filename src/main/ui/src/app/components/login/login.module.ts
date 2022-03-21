import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import {SharedModule} from "../shared/shared.module";
import {LoginComponent} from "./login.component";
import {FormsModule} from "@angular/forms";
import {I18NextModule} from "angular-i18next";


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    I18NextModule.forRoot(),
    FormsModule,
    SharedModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
