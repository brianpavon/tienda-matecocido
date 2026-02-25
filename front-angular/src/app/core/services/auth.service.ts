import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;
  private isLoggedIn$ = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  private currentUser$ = new BehaviorSubject<any>(null);

  isAuthenticated$ = this.isLoggedIn$.asObservable();
  user$ = this.currentUser$.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap((res: any) => {
        if (res.success) {
          this.saveSession(res.content.token, res.content.role, res.content.usuario.id_usuario);
        }
      })
    );
  }

  registro(data: { email: string; password: string; password_confirmation: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/registro`, data).pipe(
      tap((res: any) => {
        if (res.success) {
          this.saveSession(res.content.token, res.content.role, res.content.usuario.id_usuario);
        }
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/logout`, {}).pipe(
      tap(() => this.clearSession())
    );
  }

  getMe(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/me`).pipe(
      tap((res: any) => {
        if (res.success) {
          this.currentUser$.next(res.content);
        }
      })
    );
  }

  cambiarPassword(passwordActual: string, password: string, passwordConfirmation: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/auth/cambiar-password`, {
      password_actual: passwordActual,
      password,
      password_confirmation: passwordConfirmation,
    });
  }

  saveSession(token: string, role: string, userId: number): void {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('userId', String(userId));
    this.isLoggedIn$.next(true);
  }

  clearSession(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    this.isLoggedIn$.next(false);
    this.currentUser$.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
