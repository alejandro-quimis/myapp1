import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario';
import { CrudService } from '../crud.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends CrudService<Usuario, number> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, 'http://localhost:8080/api/usuario/');
   }
}
