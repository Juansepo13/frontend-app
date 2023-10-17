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
    PrimeNGConfig: PrimeNGConfig,
  ) {}

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
      width: '600px',
      height: '700px',
      backdropClass: 'custom-dialog-background' // Clase CSS personalizada para el fondo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo de creación se ha cerrado.');
    });
  }

  openEditUserDialog(userId: number): void {
    const dialogRef = this.dialog.open(UserEditComponent, {
      width: '600px',
      height: '700px',
      backdropClass: 'custom-dialog-background', // Clase CSS personalizada para el fondo
      data: { userId } // Pasamos el ID del usuario al componente de edición
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo de edición se ha cerrado.');
    });
  }

  openDetailsUserDialog(userId: number): void {
    this.userService.getUserById(userId).subscribe(
      (userToDisplay) => {
        const dialogRef = this.dialog.open(UserEditComponent, {
          width: '600px',
          height: '700px',
          backdropClass: 'custom-dialog-background',
          data: { user: userToDisplay }
        });
  
        dialogRef.afterClosed().subscribe(result => {
          console.log('El diálogo de detalles se ha cerrado.');
        });
      },
      (error) => {
        console.error('Error al obtener detalles del usuario:', error);
      }
    );
  }  
  
  deleteUser() {
    
  }
}
