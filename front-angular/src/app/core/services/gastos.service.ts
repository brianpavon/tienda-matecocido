import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface GastoData {
  tipo: string;
  monto: number;
  fecha: string;
  descripcion?: string | null;
}

@Injectable({ providedIn: 'root' })
export class GastosService {
  private apiUrl = `${environment.apiUrl}/gastos`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  create(data: GastoData): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  update(id: number, data: Partial<GastoData>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
