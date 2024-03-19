import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  apiUrl : string = `${environment.apiUrl}/colores`;
  constructor(private http:HttpClient) { }

  getColors():Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }
}
