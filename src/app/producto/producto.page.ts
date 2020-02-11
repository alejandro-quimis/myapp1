import { ComprarPage } from './../comprar/comprar.page';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ProductoService } from '../services/producto/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

 
  public productos: any[] = [];
  public lista: Producto[] = [];
  items: Producto[] = [];

  constructor(private modalCtrl: ModalController, public _login: AuthService, private productService: ProductoService) {
    this.initializeItems();
  }

  ngOnInit(){
    
    this.productService.lista().subscribe((e: any) => {
      this.lista = e;
  });
  }
  
  initializeItems() {
    this.items = this.lista;
  }

  getItems(ev) {
    this.initializeItems();
    // set val to the value of the ev target
    var val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  async abrirModal() {

    const modal = await this.modalCtrl.create({
      component: ComprarPage,
      componentProps: {
        nombre: 'Fernando',
        pais: 'Costa Rica'
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    console.log('Retorno del modal', data );

  }
}
