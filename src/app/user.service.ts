import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importa HttpHeaders
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/tuits';
  private httpOptions = { // Define httpOptions
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

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

  editUser(id: number, tuit: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, tuit, this.httpOptions);
  }   

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateUser(Id: number, user: { message: string }): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${Id}`, user, this.httpOptions); // Utiliza this.httpOptions
  }
}
