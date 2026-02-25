import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ColoresService {
  private apiUrl = `${environment.apiUrl}/colores`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  create(data: { codigo: string; nombre: string; path_img?: string }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  update(id: number, data: { codigo?: string; nombre?: string; path_img?: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
