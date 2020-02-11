import { SplashScreen } from '@ionic-native/splash-screen';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
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

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
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
