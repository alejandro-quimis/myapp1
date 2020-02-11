import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public ngform: FormGroup;
  public user: any;
  registerUser: any;

  constructor(public alertCtrl: AlertController,private router: Router, public _userService: UsuarioService, public _auth: AuthService) {
    this.ngform = new FormGroup({
      usuario: new FormControl( '' , Validators.required),
      contrasena: new FormControl( '' , Validators.required)
    });
    this._userService.lista().subscribe((e: any) => {
      this.user = e;
      console.log(this.user);
    }, (error: any) => {
    }
    );
  }

 
  async submit(){
    let resp;
    for (let i = 0; i < this.user.length; i++) {
            resp = this._auth.login(
                this.user[i].usuario,
                this.ngform.get('usuario').value,
                this.user[i].contrasena,
                this.ngform.get('contrasena').value,
                this.user[i].codigo
            );
            if (resp) {
                this.router.navigate(['']);
                break;
            } else if (!resp && i === this.user.length - 1 ) {
              const alert = await this.alertCtrl.create({
                header: 'Alert',
                subHeader: 'Login Incorrecto',
                message: 'Usuario y Contraseña Incorrecta.',
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
        }

    
  }

  registerModal(){

  }

  ngOnInit() {}

}
