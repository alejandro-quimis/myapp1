import { SplashScreen } from '@ionic-native/splash-screen';
import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  usuario: string;
  public appPages = [
    {
      title: 'PRODUCTOS',
      url: '/',
      icon: 'home'
    },
    {
      title: 'LISTA DE PRODUCTOS',
      url: '/listar',
      icon: 'list'
    },
    {
      title: 'LOGOUT',
      url: '/logout',
      icon: 'exit'
    }
  ];
  ngOnInit(){
    this.usuario = this.AuthService.geUserLogin().user;

  }
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private AuthService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
