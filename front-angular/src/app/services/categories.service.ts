import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  apiUrl : string = `${environment.apiUrl}/categorias`;
  constructor(private http:HttpClient) { }

  
  getCategories():Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }
}
