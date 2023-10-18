import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { PrimeNGConfig } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { UserCreateComponent } from '../user-create/user-create.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserDeleteComponent } from '../user-delete/user-delete.component';
import { UserDeleteByIdComponent } from '../user-delete-by-id/user-delete-by-id.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchText: string = '';
  toggleSearch: boolean = false;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    PrimeNGConfig: PrimeNGConfig
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  customSort(event: any) {
    // Verificar por qué columna se está ordenando
    if (event.field === 'id') {
      this.filteredUsers.sort((userA, userB) => {
        // Ordenar en función del valor de la columna 'id'
        if (event.order === 1) {
          // Orden ascendente
          return userA.id - userB.id;
        } else {
          // Orden descendente
          return userB.id - userA.id;
        }
      });
    }
  }
  

  loadUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
        this.users.sort((a, b) => a.id - b.id);
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
      width: '600px',
      height: '700px',
      backdropClass: 'custom-dialog-background', // Clase CSS personalizada para el fondo
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('El diálogo de creación se ha cerrado.');
    });
  }

  openEditUserDialog(userId: number): void {
    const dialogRef = this.dialog.open(UserEditComponent, {
      width: '600px',
      height: '700px',
      backdropClass: 'custom-dialog-background',
      data: { userId, editMode: true }, // Pasamos el ID del usuario y establecemos el modo de edición
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'saved') {
        // Realizar acciones después de guardar los cambios (por ejemplo, volver a cargar la lista de usuarios)
        this.loadUsers(); // Recarga la lista de usuarios después de guardar cambios
      }
    });
  }

  openDetailsUserDialog(userId: number): void {
    this.userService.getUserById(userId).subscribe(
      (userToDisplay) => {
        const dialogRef = this.dialog.open(UserEditComponent, {
          width: '600px',
          height: '700px',
          backdropClass: 'custom-dialog-background',
          data: { user: userToDisplay },
        });
  
        dialogRef.afterClosed().subscribe((result) => {
          console.log('El diálogo de detalles se ha cerrado.');
        });
      },
      (error) => {
        console.error('Error al obtener detalles del usuario:', error);
      }
    );
  }
  

  openDeleteUserDialog(userId: number): void {
    const dialogRef = this.dialog.open(UserDeleteComponent, {
      width: '400px',
      height: '400px',
      backdropClass: 'custom-dialog-background',
      data: { userId },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'deleted') {
        // Verifica que userId sea un número válido antes de enviar la solicitud de eliminación
        if (!isNaN(userId) && userId > 0) {
          this.userService.deleteUser(userId).subscribe(
            () => {
              // Realiza acciones después de eliminar el usuario
              this.loadUsers(); // Recarga la lista de usuarios después de eliminar un usuario
            },
            (error) => {
              console.error('Error al eliminar el usuario:', error);
            }
          );
        }
      }
    });
  }

  openDeleteUserByIdDialog(): void {
    const dialogRef = this.dialog.open(UserDeleteByIdComponent, {
      width: '600px',
      height: '700px',
      backdropClass: 'custom-dialog-background',
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'deleted') {
        // Realiza acciones después de eliminar el usuario
        this.loadUsers(); // Recarga la lista de usuarios después de eliminar un usuario
      }
    });
  }
  
  
  
  
}
