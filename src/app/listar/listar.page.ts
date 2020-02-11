import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from '../services/producto/producto.service';
import { AuthService } from '../services/auth.service';
import { ComprasService } from '../services/compras/compras.service';
import { Compras } from '../models/compras';
import { ModalController } from '@ionic/angular';
import { ComprarPage } from '../comprar/comprar.page';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {
  compras: any;
  numero= 2;
  // tslint:disable-next-line: max-line-length
  constructor(private modalCtrl: ModalController, private router: Router, private compraService: ComprasService, private  productoservice: ProductoService,private _auth: AuthService ) { }
  ngOnInit() {
    this.getcompra();
  }

  getcompra() {
    this.compraService.obtenercomprasproductossuario(this._auth.geUserLogin().id).subscribe((e: any) => {
       this.compras = e;
    });
 
   }
   
  async abrirModal(item) {
    const modal = await this.modalCtrl.create({
      component: ComprarPage,
      componentProps: {
        item: this.compras, numero: this.numero
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    console.log('Retorno del modal', data );

  }

}
