import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { GuardGuard } from '../auth/guard.guard';
import { ProductoPage } from '../producto/producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '', canActivate: [GuardGuard],
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, ProductoPage]
})
export class HomePageModule {}
