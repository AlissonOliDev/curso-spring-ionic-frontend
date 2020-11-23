import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { DomSanitizer } from '@angular/platform-browser';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { StorageService } from '../../services/storage.service';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';




/**
 * Generated class for the CadCategoriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cad-categoria',
  templateUrl: 'cad-categoria.html',
})
export class CadCategoriaPage {
 
  categoria: CategoriaDTO;
  picture: string;
  categoriaImage;
  cameraOn: boolean = false;
  formGroup: FormGroup;

  items: CategoriaDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,                            
    public categoriaService: CategoriaService,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public sanitizer: DomSanitizer,
    public camera: Camera,
    public storage: StorageService
    ) {

      this.categoriaImage = 'https://alissondev-spring-ionic.s3-sa-east-1.amazonaws.com/semimgcat.jpg';

      this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(120)]],
      imageUrl: ['', []]
      }); 
  }

  getImageIfExists() {
    this.categoriaService.getImageFromBucket(this.categoria.id)
    .subscribe(response => {
      this.categoria.imageUrl = `${API_CONFIG.bucketBaseUrl}/cat${this.categoria.id}.jpg`;
      this.blobToDataURL(response).then(dataUrl => {
        let str : string = dataUrl as string;
        this.categoriaImage = this.sanitizer.bypassSecurityTrustUrl(str);
      });
    },
    error => {
      this.categoriaImage = 'assets/imgs/avatar-semimg.png';
    });
  }
   // https://gist.github.com/frumbert/3bf7a68ffa2ba59061bdcfc016add9ee
   blobToDataURL(blob) {
    return new Promise((fulfill, reject) => {
        let reader = new FileReader();
        reader.onerror = reject;
        reader.onload = (e) => fulfill(reader.result);
        reader.readAsDataURL(blob);
    })
  }

  getCameraPicture() {

    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     this.categoriaImage = 'data:image/png;base64,' + imageData;
     this.cameraOn = false;
    }, (err) => {
      this.cameraOn = false;
    });
  }
  getGalleryPicture() {

    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     this.categoriaImage = 'data:image/png;base64,' + imageData;
     this.cameraOn = false;
    }, (err) => {
      this.cameraOn = false;
    });
  }

  sendPicture() {
    this.categoriaService.uploadPicture(this.categoriaImage)
      .subscribe(response => {
        this.categoriaImage = null;
        this.getImageIfExists();
      },
      error => {
      });
  }

  cancel() {
    this.categoriaImage = null;
  }

  cadcat() {    
    this.categoriaService.insert(this.formGroup.value)
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