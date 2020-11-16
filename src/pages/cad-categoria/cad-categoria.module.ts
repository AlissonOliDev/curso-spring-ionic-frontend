import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadCategoriaPage } from './cad-categoria';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    CadCategoriaPage,
  ],
  imports: [
    IonicPageModule.forChild(CadCategoriaPage),
  ],
  providers: [
    Camera
  ]
})
export class CadCategoriaPageModule {}
