import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadProdPage } from './cad-prod';
import { CategoriaService } from '../../services/domain/categoria.service';
import { ProdutoService } from '../../services/domain/produto.service';

@NgModule({
  declarations: [
    CadProdPage,
  ],
  imports: [
    IonicPageModule.forChild(CadProdPage),
  ],
  providers: [
    ProdutoService,
    CategoriaService,    
  ],
})
export class CadProdPageModule {}
