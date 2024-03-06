import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiUrl : string = `${environment.apiUrl}/productos`;
  constructor(private http: HttpClient) { }

  getProducts():Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }
  getProductsByCategory(categoria:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/producto-categoria/${categoria}`);
  }
  getProductByCode(codigo:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${codigo}`);
  }

  getProductsDB(categoria:any){
    return categoria ? this.http.get<any>(`${this.apiUrl}/producto-categoria/${categoria}`) : this.http.get<any>(this.apiUrl);
  }
}
