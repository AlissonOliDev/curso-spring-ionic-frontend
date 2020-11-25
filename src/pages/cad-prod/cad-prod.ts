import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { DomSanitizer } from '@angular/platform-browser';

import { StorageService } from '../../services/storage.service';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

/**
 * Generated class for the CadProdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cad-prod',
  templateUrl: 'cad-prod.html',
})
export class CadProdPage {

  produto: ProdutoDTO[];
  picture: string;
  produtoImage;  
  formGroup: FormGroup;
  categoria: CategoriaDTO;
  categorias: CategoriaDTO[];
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,                            
    public categoriaService: CategoriaService,
    public produtoService: ProdutoService,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public sanitizer: DomSanitizer,    
    public storage: StorageService) 
  {    
      this.formGroup = this.formBuilder.group({
      nome: ['Camera', [Validators.required, Validators.minLength(1), Validators.maxLength(120)]],
      preco: ['250', [Validators.required, Validators.minLength(1), Validators.maxLength(120)]],
      categoriaId : [null, [Validators.required]],      
      imageUrl : ['', []]
      }); 
  }

  ionViewDidLoad() {
    this.categoriaService.findAll()
    .subscribe(response => {
      this.categorias = response;
      this.formGroup.controls.categoriaId.setValue(this.categorias[0].id);      
    },
    error => {});
  }

  cadastrarProduto() {    
    this.produtoService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
      error => {});
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot('CategoriasPage');
          }
        }
      ]
    });
    alert.present();
  }

  adm() {
    this.navCtrl.setRoot('AdmPage');
  }  
}
