import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserCreateComponent } from '../user-create/user-create.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserDeleteComponent } from '../user-delete/user-delete.component';
import { UserDeleteByIdComponent } from '../user-delete-by-id/user-delete-by-id.component';
import { UserDetailsComponent } from '../user-details/user-details.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  user: number[] |undefined;
  filteredUsers: any[] = [];
  searchText: string = '';
  toggleSearch: boolean = false;
  selectedUsers: any[] = [];
  userId: number | undefined;
  isDeleteConfirmation: any;
  selectedUserIds: number[] = [];
  selectedUserDetails: any;
  

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
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
  loadUser(userId: number) {
    this.userService.getUserId(userId).subscribe(
      (data) => {
        this.selectedUserDetails = data; // Actualiza la propiedad selectedUserDetails
      },
      (error) => {
        console.error('Error al cargar el usuario por ID:', error);
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
      backdropClass: 'custom-dialog-background',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'created') {
        this.loadUsers(); // Recargar la lista después de crear un usuario
      }
    });
  }

  onSelectAll(event: any) {
    this.selectedUsers = event.checked ? [...this.users] : [];
  }

  onRowSelect(event: any): void {
    const selectedUserId = event.data.id;
    if (this.selectedUserIds.includes(selectedUserId)) {
      this.selectedUserIds = this.selectedUserIds.filter((id) => id !== selectedUserId);
    } else {
      this.selectedUserIds.push(selectedUserId);
    }
  }
    
  onUserSelect(event: any, user: any) {
    if (event.checked) {
      this.selectedUsers = [...this.selectedUsers, user];
    } else {
      this.selectedUsers = this.selectedUsers.filter(
        (selectedUser) => selectedUser.id !== user.id
      );
    }
  }

  openEditUserDialog(userId: number): void {
    const dialogRef = this.dialog.open(UserEditComponent, {
      width: '600px',
      height: '700px',
      backdropClass: 'custom-dialog-background',
      data: { userId, editMode: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'updated') {
        this.loadUsers(); // Recargar la lista después de actualizar un usuario
      }
    }
    
    );
  }

   openDetailsUserDialog(userId: number): void {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
    width: '600px',
    height: '700px',
    backdropClass: 'custom-dialog-background',
    data: { selectedUserId: userId },
  });

  dialogRef.afterClosed().subscribe((result) => {
    console.log('El diálogo de detalles se ha cerrado.');
  });
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
        this.loadUsers(); // Recargar la lista después de eliminar un usuario
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
        this.loadUsers(); // Recargar la lista después de eliminar un usuario
      }
    });
  }

  deleteUserById(userId: number): void {
    this.userService.deleteUsers([userId]).subscribe(() => {
      this.loadUsers(); // Recargar la lista después de eliminar el usuario
    });
  }

  deleteSelectedUsers() {
    const selectedUserIds = this.selectedUsers.map((user) => user.id);

    this.userService.deleteUsers(selectedUserIds).subscribe(() => {
      this.loadUsers(); // Recargar la lista después de eliminar usuarios
      this.selectedUsers = [];
    });
  }

  confirmDeleteSelected(): void {
    if (this.selectedUserIds.length > 0) {
      this.deleteUsersByIds(this.selectedUserIds);
      this.selectedUserIds = [];
    }
  }
  deleteUsersByIds(selectedUserIds: number[]): void {
    this.userService.deleteUsers(selectedUserIds).subscribe(
      () => {
        // La eliminación fue exitosa
        this.loadUsers(); // Recargar la lista después de eliminar usuarios
      },
      (error) => {
        console.error('Error al eliminar usuarios:', error);
      }
    );
  } 
  
  
  
}
