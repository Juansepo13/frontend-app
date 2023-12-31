import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, Subject } from 'rxjs';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/tuits';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  
  getUserId(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }


  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  editUser(id: number, updatedUserData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updatedUserData, this.httpOptions);
  }
  

  updateUser(Id: number, user: { message: string }): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${Id}`, user, this.httpOptions);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  deleteUsers(userIds: number[]): Observable<void[]> { // Cambio en el tipo de retorno
    const deleteRequests: Observable<void>[] = userIds.map(userId =>
      this.http.delete<void>(`${this.apiUrl}/${userId}`)
    );
    
    return forkJoin(deleteRequests);
  }

  // Agrega un Subject para notificar sobre cambios en los datos
  private dataChanged = new Subject<void>();

  // Emite el evento cuando se realice con éxito una operación
  notifyDataChanged() {
    this.dataChanged.next();
  }

  // Retorna un Observable para que los componentes se suscriban a los cambios
  onDataChanged(): Observable<void> {
    return this.dataChanged.asObservable();
  }
}
