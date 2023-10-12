import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = []; // Inicializamos la lista de usuarios como un array vacío

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers(); // Llama a la función para cargar la lista de usuarios al iniciar el componente
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error al cargar la lista de usuarios:', error);
      }
    );
  }
}
