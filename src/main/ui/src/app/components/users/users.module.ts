import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListingComponent } from './users-listing/users-listing.component';
import {SharedModule} from "../shared/shared.module";
import { RegisterUserComponent } from './register-user/register-user.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    UsersListingComponent,
    RegisterUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class UsersModule { }
