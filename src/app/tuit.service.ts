import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TuitService {
  private  apiUrl = 'http://localhost:3000/tuits'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  getTuits(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getTuit(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createTuit(message: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { message });
  }

  updateTuit(id: number, message: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, { message });
  }

  deleteTuit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
