import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  user: any = {}; // Objeto para almacenar los datos del usuario
  editMode: boolean = false; // Indicador de modo de edición

  constructor(
    private dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private userService: UserService
  ) {
    this.editMode = data.editMode || false;
  }

  ngOnInit(): void {
    const userId = this.data.userId;

    if (userId) {
      this.loadUserData(userId);
    }
  }

  loadUserData(userId: number) {
    this.userService.getUserById(userId).subscribe(
      (data) => {
        this.user = data; // Asigna los datos del usuario al objeto user
      },
      (error) => {
        console.error('Error al cargar los datos del usuario:', error);
      }
    );
  }

  closeDetailsUserDialog() {
    this.dialogRef.close();
  }

  saveChanges() {
    if (this.editMode) {
      // Asegúrate de que el modo de edición esté habilitado antes de guardar los cambios
      // Aquí debes agregar la lógica para guardar los cambios en el usuario
      // Por ejemplo:
      this.userService.editUser(this.user.id, this.user).subscribe(
        (data) => {
          console.log('Cambios guardados con éxito:', data);
          this.dialogRef.close('saved'); // Cierra el diálogo después de guardar
        },
        (error) => {
          console.error('Error al guardar los cambios:', error);
          // Puedes manejar errores aquí
        }
      );
    }
  }
}
