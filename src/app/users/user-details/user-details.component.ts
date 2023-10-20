import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../user.service'; // Importa el servicio de usuarios

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  selectedUserDetails: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UserDetailsComponent>,
    private userService: UserService // Inyecta el servicio de usuarios
  ) {
    // Verifica si se ha proporcionado un userId y luego carga los detalles del usuario
    if (data.selectedUserId) {
      this.loadUser(data.selectedUserId);
    }
  }

  ngOnInit() {
    // Realiza cualquier inicialización necesaria aquí
  }

  loadUser(userId: number) {
    this.userService.getUserId(userId).subscribe(
      (data) => {
        this.selectedUserDetails = data;
      },
      (error) => {
        console.error('Error al cargar el usuario por ID:', error);
      }
    );
  }

  confirmCancel() {
    this.dialogRef.close();
  }
}
