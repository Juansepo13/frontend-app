import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss'],
})
export class UserDeleteComponent {
  user: any;

  constructor(
    private dialogRef: MatDialogRef<UserDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private userService: UserService
  ) {
    this.user = data.user; // Usar la propiedad 'user' en lugar de 'Id'
  }

  confirmDelete() {
    if (this.data.userId) {
      // Llama al servicio para eliminar el usuario
      this.userService.deleteUsers([this.data.userId]).subscribe(
        () => {
          // Eliminación exitosa, cierra el cuadro de diálogo y envía 'deleted' como resultado
          this.dialogRef.close('deleted');
        },
        (error: any) => {
          console.error('Error al eliminar el usuario:', error);
          // Puedes manejar errores aquí si es necesario
        }
      );
    }
  }

  confirmCancel() {
    // Cierre directo del diálogo sin mostrar una confirmación
    this.dialogRef.close('canceled');
  }
}
