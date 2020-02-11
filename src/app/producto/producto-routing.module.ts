import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductoPage } from './producto.page';
import { GuardGuard } from '../auth/guard.guard';

const routes: Routes = [
  {
    path: '', canActivate: [GuardGuard],
    component: ProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductoPageRoutingModule {}
