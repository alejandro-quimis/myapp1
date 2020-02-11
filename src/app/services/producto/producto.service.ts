import { Injectable } from '@angular/core';
import { CrudService } from '../crud.service';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends CrudService<Producto, number> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, 'http://localhost:8080/api/producto/');
   }
}