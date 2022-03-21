import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersListingComponent} from "./users-listing/users-listing.component";
import {RegisterUserComponent} from "./register-user/register-user.component";

const routes: Routes = [
  { path: '', component: UsersListingComponent},
  { path: 'register', component: RegisterUserComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
