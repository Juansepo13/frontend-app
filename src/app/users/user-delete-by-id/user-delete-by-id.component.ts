import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-delete-by-id',
  templateUrl: './user-delete-by-id.component.html',
  styleUrls: ['./user-delete-by-id.component.scss'],
})
export class UserDeleteByIdComponent {
  userIdToDelete: number | undefined; // Esta propiedad almacenará el ID ingresado por el usuario

  constructor(public dialogRef: MatDialogRef<UserDeleteByIdComponent>, private userService: UserService) {}

  confirmDelete(): void {
    // Asegúrate de validar el valor antes de realizar la eliminación
    if (this.userIdToDelete && !isNaN(this.userIdToDelete) && this.userIdToDelete > 0) {
      // Realiza la eliminación y luego cierra el diálogo
      this.userService.deleteUsers([this.userIdToDelete]).subscribe(
        () => {
          // Realiza acciones después de eliminar el usuario
          this.dialogRef.close('deleted');
        },
        (error) => {
          console.error('Error al eliminar el usuario:', error);
        }
      );
    } else {
      // Maneja el caso de entrada no válida (ID no válido)
      // Puedes mostrar un mensaje de error o realizar otra acción apropiada
    }
  }

  confirmCancel(): void {
    this.dialogRef.close(); // Cierra el diálogo sin realizar ninguna acción
  }
}
