import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComprarPageRoutingModule } from './comprar-routing.module';

import { ComprarPage } from './comprar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  declarations: [ComprarPage],
  exports: [ComprarPageRoutingModule]
})
export class ComprarPageModule {}
