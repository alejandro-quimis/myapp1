import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarPage } from './listar.page';
import { GuardGuard } from '../auth/guard.guard';

const routes: Routes = [
  {
    path: '', canActivate: [GuardGuard],
    component: ListarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarPageRoutingModule {}
