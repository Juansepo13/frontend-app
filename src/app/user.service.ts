import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/tuits'; // Reemplaza con la URL correcta de tu backend

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  editUser(id: number, user: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
    
  }

  updateUser(userId: number, updatedMessage: string): Observable<any> {
    const userData = { message: updatedMessage }; // Crear un objeto con el mensaje actualizado
    return this.http.patch<any>(`${this.apiUrl}/${userId}`, userData);
  }
  
}
