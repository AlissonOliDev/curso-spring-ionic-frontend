import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AdmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adm',
  templateUrl: 'adm.html',
})
export class AdmPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdmPage');
  }

  cadcat() {
    this.navCtrl.setRoot('CadCategoriaPage');
  }

  categoria() {
    this.navCtrl.setRoot('CategoriasPage');
  }

  cadProduto() {
    this.navCtrl.setRoot('CadProdPage');
  }

  catProd(){
    this.navCtrl.setRoot('CatProdPage')
  }
}
