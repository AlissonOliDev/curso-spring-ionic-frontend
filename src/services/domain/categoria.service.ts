import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { CategoriaDTO } from "../../models/categoria.dto";
import { StorageService } from "../storage.service";
import { ImageUtilService } from "../image-util.service";

@Injectable()
export class CategoriaService {

    constructor(
        public http: HttpClient,
        public storage: StorageService,
        public imageUtilService: ImageUtilService) {

    }
      
    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/categorias/${id}`);
    }

    findAll() : Observable<CategoriaDTO[]> {
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
    }   

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cat${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }

    uploadPicture(categoriaImage) {
        let pictureBlob = this.imageUtilService.dataUriToBlob(categoriaImage);
        let formData : FormData = new FormData();
        formData.set('file', pictureBlob, 'file.png');
        return this.http.post(
            `${API_CONFIG.bucketBaseUrl}/`, 
            formData,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }    

    insert(obj : CategoriaDTO) {
        return this.http.post(
            
            `${API_CONFIG.baseUrl}/categorias`,             
            obj,
            { 
                observe: 'response',
                responseType: 'text'
            }
        ); 
    }
}