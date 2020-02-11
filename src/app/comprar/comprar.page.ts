import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { Producto } from '../models/producto';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Compras } from '../models/compras';
import { AuthService } from '../services/auth.service';
import { ComprasService } from '../services/compras/compras.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.page.html',
  styleUrls: ['./comprar.page.scss'],
})
export class ComprarPage implements OnInit {
  modelproducto: any;
  public ngform: FormGroup;
  public compra: Compras;
  // tslint:disable-next-line: max-line-length
  constructor(public alertCtrl: AlertController, private compraService: ComprasService, public _login: AuthService,private modalController: ModalController, private navParams: NavParams) {
    this.ngform = new FormGroup({
      codigo: new FormControl( {value: '', disabled: true}, Validators.required),
      producto: new FormControl( {value: '', disabled: true}, Validators.required),
      cantidad: new FormControl( '' , Validators.required),
      valor: new FormControl( {value: '', disabled: true}, Validators.required),
      total: new FormControl( {value: '', disabled: true}, Validators.required),

    });

  }
  ngOnInit() {
    console.log(this.navParams.data.numero);
    if (this.navParams.data.numero === 1){ 
      this.modelproducto = this.navParams.data.item;
      this.ngform = new FormGroup({
        codigo: new FormControl( {value: this.modelproducto.codigo, disabled: true}, Validators.required),
        producto: new FormControl({value: this.modelproducto.nombre, disabled: true}, Validators.required),
        cantidad: new FormControl( '' , Validators.required),
        valor: new FormControl( {value: this.modelproducto.valor, disabled: true}, Validators.required),
        total: new FormControl( {value: '', disabled: true}, Validators.required),
      });
    } else if (this.navParams.data.numero === 2) {
      console.log( this.navParams.data.item);
      this.modelproducto = this.navParams.data.item;
      this.ngform = new FormGroup({
        codigoCompra: new FormControl( {value: this.modelproducto.codigo, disabled: true}, Validators.required),
        codigousuario: new FormControl( {value: this.modelproducto.usuario, disabled: true}, Validators.required),
        fecha: new FormControl( {value: this.modelproducto.fecha, disabled: true}, Validators.required),
        codigo: new FormControl( {value: this.modelproducto.producto, disabled: true}, Validators.required),
        producto: new FormControl({value: this.modelproducto.nombre, disabled: true}, Validators.required),
        cantidad: new FormControl( {value: this.modelproducto.nombre, disabled: true}, Validators.required),
        valor: new FormControl( {value: this.modelproducto.valor, disabled: true}, Validators.required),
        total: new FormControl( {value: '', disabled: true}, Validators.required),
      });
    } 
}
 
  cambio(ev){
    this.ngform.get('total').setValue(Number(this.ngform.get('cantidad').value) * Number(this.ngform.get('valor').value));
  }
  async closeModal() {
    const onClosedData = '';
    await this.modalController.dismiss(onClosedData);
  }
  async submit(){
    this.compra = new Compras();
    this.compra.total = Number(this.ngform.get('total').value);
    this.compra.cantidad = this.ngform.get('cantidad').value;
    this.compra.estado = 'a';
    this.compra.producto = this.ngform.get('codigo').value;
    this.compra.total = this.ngform.get('total').value;
    this.compra.fecha = new Date(new Date().getDay() + '/' + new Date().getMonth() + '/' + new Date().getFullYear());
    this.compra.usuario = this._login.geUserLogin().id;
    this.compraService.crear(this.compra).subscribe((data) => {
      console.log(data);
    }, 
    async (err) => {
      console.log(err);
      console.log(err.status);
      if (err.status === 201) {
        const alert = await this.alertCtrl.create({
          header: 'Success',
          subHeader: 'COMPRA INGRESADA CORRECTAMENTE',
          buttons: [
            {
                text: 'Ok',
                handler: (blah) => {
                  this.closeModal();
                }
            }
          ]
          });
        await alert.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Alert',
        subHeader: 'ERROR AL ACTUALIZAR',
        buttons: [
          {
              text: 'Ok',
              handler: (blah) => {
              console.log('Botón OK');
              }
          }
        ]
        });
      await alert.present();

    }
    });
  }


}
