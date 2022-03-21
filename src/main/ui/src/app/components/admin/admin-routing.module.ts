import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./admin.component";

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      { path: 'bills', loadChildren: () => import('../../components/bills/bill-tax-type/bill-tax-type.module').then( m => m.BillTaxTypeModule) },
      { path: 'suppliers', loadChildren: () => import('../../components/suppliers/suppliers.module').then( m => m.SuppliersModule) },
      { path: 'users', loadChildren: () => import('../../components/users/users.module').then( m => m.UsersModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
