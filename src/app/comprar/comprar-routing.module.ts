import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComprarPage } from './comprar.page';
import { GuardGuard } from '../auth/guard.guard';

const routes: Routes = [
  {
    path: '', canActivate: [GuardGuard],
    component: ComprarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComprarPageRoutingModule {}
