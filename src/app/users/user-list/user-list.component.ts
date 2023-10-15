import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchText: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
        this.filteredUsers = data;
      },
      (error) => {
        console.error('Error al cargar la lista de usuarios:', error);
      }
    );
  }

  search() {
    this.filteredUsers = this.users.filter((user) => {
      return user.user.name.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }

  onRowEditInit(user: any) {
    // Implementa la lógica para iniciar la edición del usuario
  }

  onRowEditSave(user: any) {
    // Implementa la lógica para guardar los cambios después de editar
  }

  onRowEditCancel(user: any, ri: number) {
    // Implementa la lógica para cancelar la edición
  }
}
