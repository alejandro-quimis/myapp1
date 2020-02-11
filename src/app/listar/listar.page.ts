import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from '../services/producto/producto.service';
import { AuthService } from '../services/auth.service';
import { ComprasService } from '../services/compras/compras.service';
import { Compras } from '../models/compras';
import { ModalController, AlertController } from '@ionic/angular';
import { ComprarPage } from '../comprar/comprar.page';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {
  compras: any;
  numero = 2;
  // tslint:disable-next-line: max-line-length
  constructor(public alertCtrl: AlertController, private modalCtrl: ModalController, private router: Router, private compraService: ComprasService, private  productoservice: ProductoService,private _auth: AuthService ) { }
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
        item, numero: this.numero
      }
    });

    await modal.present();

    const  data  = await modal.onDidDismiss();
    console.log(data.data);
    if (data.data === 'ok') {
      this.getcompra();
    }
  }
  async eliminar(item) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      subHeader: 'Está seguro que desea eliminar?',
      buttons: [
        {
            text: 'Si',
            handler: (blah) => {
              this.compraService.borrar(item.codigo).subscribe(() => {
              }, async (err) => {
                  if (err.status === 200) {
                    const alert = await this.alertCtrl.create({
                      header: 'Success',
                      subHeader: 'ELIMINADO CORRECTAMENTE',
                      buttons: [
                        {
                            text: 'Ok',
                            handler: (blah) => {
                              this.getcompra();
                            }
                        }
                      ]
                      });
                    await alert.present();
                  }
              });
            }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (blah) => {
            
          }
      }
      ]
      });
    await alert.present();
  }

}
