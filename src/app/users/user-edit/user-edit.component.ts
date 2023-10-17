import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UserService } from '../../user.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent {
  displayDialog: boolean = false;

  user: any = {};
  userId: number | undefined;
  updatedMessage: string | undefined;
  updatedName: string | undefined;
  updatedEmail: string | undefined;
  updatedUsername: string | undefined;
  updatedTuit: string | undefined;

  @ViewChild('userForm') userForm?: NgForm;

  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<UserEditComponent>
  ) {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];

      if (isNaN(this.userId)) {
        console.error('ID de usuario no válido.');
      } else {
        this.userService.getUserById(this.userId).subscribe(
          (userData) => {
            this.user = userData.user;
            this.updatedMessage = userData.message;
          },
          (error) => {
            console.error('Error al obtener los datos del usuario:', error);
          }
        );
      }
    });
  }

  editUser() {
    if (this.userForm && this.userForm.valid) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      const updatedUserData = {
        user: {
          name: this.updatedName || this.user.name,
          email: this.updatedEmail || this.user.email,
          username: this.updatedUsername || this.user.username
        },
        message: this.updatedMessage,
        tuit: this.updatedTuit
      };

      this.userService.editUser(this.userId!, updatedUserData).subscribe(
        (data) => {
          console.log('Usuario actualizado con éxito:', data);
          this.router.navigate(['/users']);
          this.dialogRef.close(); // Cierra el diálogo
        },
        (error) => {
          console.error('Error al actualizar el usuario:', error);
          if (error instanceof HttpErrorResponse) {
            console.error('Estado:', error.status);
            console.error('Texto del estado:', error.statusText);
            console.error('Cuerpo de la respuesta:', error.error);
          }
        }
      );
    }
  }

  confirmCancel() {
    if (confirm('¿Estás seguro de que deseas cancelar la edición del usuario?')) {
      this.dialogRef.close(); // Cierra el diálogo después de cancelar
      this.router.navigate(['/users-list']);
    }
  }
}
