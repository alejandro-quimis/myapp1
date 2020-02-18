import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from '../services/producto/producto.service';
import { AuthService } from '../services/auth.service';
import { ComprasService } from '../services/compras/compras.service';
import { Compras } from '../models/compras';
import { ModalController, AlertController, IonInfiniteScroll } from '@ionic/angular';
import { ComprarPage } from '../comprar/comprar.page';
import { Producto } from '../models/producto';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {
  compras: any[];
  numero = 5;
  pagina = 2;
  siguiente = 0;
  @ViewChild(IonInfiniteScroll, { static: true}) infiniteScroll: IonInfiniteScroll;
  dataList: any[] = [];
  comprasproducto: any;
 
  // tslint:disable-next-line: max-line-length
  constructor(public alertCtrl: AlertController, private modalCtrl: ModalController, private router: Router, private compraService: ComprasService, private  productoservice: ProductoService,private _auth: AuthService ) { 
  }
  getcompra() {
    this.dataList = [];
    this.compraService.obtenercomprasproductossuario(this._auth.geUserLogin().id).subscribe((e: any) => {
       this.compras = e;
       console.log(this.compras);
       for (let index = 0; index < this.numero; index++) {
          this.comprasproducto = this.compras[index];
          this.dataList.push(this.comprasproducto);
          this.siguiente = index;
        }
       this.siguiente = this.siguiente + 1;
      });
   }
  ngOnInit() {
    this.getcompra();
  }

  loadData(event) {
      setTimeout(() => {
      if (this.siguiente < this.compras.length ) {
        for (let index = 0; index < this.numero ; index++) {
          if (this.siguiente < this.compras.length) {
            this.comprasproducto = this.compras[this.siguiente];
            this.dataList.push(this.comprasproducto);
            this.siguiente = this.siguiente + 1;
            console.log(this.dataList);
          } else {
            event.target.complete();
            this.infiniteScroll.disabled = true;
            break;
          }
        }
        event.target.complete();
      } else {
        event.target.complete();
        this.infiniteScroll.disabled = true;
      }
    }, 500);
  }
  async abrirModal(item) {
    console.log(item);
    const modal = await this.modalCtrl.create({
      component: ComprarPage,
      componentProps: {
        item, numero: this.pagina
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
