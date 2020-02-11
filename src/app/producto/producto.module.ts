import { ComprarPage } from './../comprar/comprar.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductoPageRoutingModule } from './producto-routing.module';

import { ProductoPage } from './producto.page';
import { ComprarPageModule } from '../comprar/comprar.module';

@NgModule({
  entryComponents: [
    ComprarPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductoPageRoutingModule,
    ComprarPageModule
  ],
  declarations: [ProductoPage,ComprarPage],
  exports: [ProductoPageRoutingModule
  ]
})
export class ProductoPageModule {}
