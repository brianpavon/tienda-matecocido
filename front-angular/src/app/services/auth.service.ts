import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl : string = `${environment.apiUrl}/auth`
  
  constructor(private http: HttpClient) { 

  }

  login(data : any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/login`,data);
  }
}
