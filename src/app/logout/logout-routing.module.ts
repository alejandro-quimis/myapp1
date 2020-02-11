import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogoutPage } from './logout.page';
import { GuardGuard } from '../auth/guard.guard';

const routes: Routes = [
  {
    path: '', canActivate: [GuardGuard],
    component: LogoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogoutPageRoutingModule {}
