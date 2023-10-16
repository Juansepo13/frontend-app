// user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { PrimeNGConfig } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { UserCreateComponent } from '../user-create/user-create.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserDeleteComponent } from '../user-delete/user-delete.component';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchText: string = '';
  toggleSearch: boolean = false;

  constructor(
    private userService: UserService, 
    private dialog: MatDialog, 
    PrimeNGConfig: PrimeNGConfig) {}


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

  openSearch() {
    this.toggleSearch = true;
  }

  searchClose() {
    this.searchText = '';
    this.toggleSearch = false;
  }

  openCreateUserDialog(): void {
    const dialogRef = this.dialog.open(UserCreateComponent, {
      width: '600px', // Ancho de 600px
      height: '700px', // Alto de 700px
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se ha cerrado.');
      // Puedes realizar acciones adicionales si es necesario después de que el diálogo se cierre.
    });
  }

  openEditUserDialog(...args: []): void {
    const dialogRef = this.dialog.open(UserEditComponent, {
      width: '600px',
      height: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo de edición se ha cerrado.');
      // Realiza acciones adicionales si es necesario después de que el diálogo se cierre.
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
