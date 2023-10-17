import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UserService } from '../../user.service';
import { MatDialogRef } from '@angular/material/dialog';  // Importa MatDialogRef

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent {
  newUser: any = {
    name: '',
    email: '',
    username: '',
    password: '',
    message: ''
  };

  @ViewChild('userForm') userForm?: NgForm;

  constructor(
    private router: Router, 
    private userService: UserService,
    private dialogRef: MatDialogRef<UserCreateComponent>  // Inyecta MatDialogRef
  ) {}

  createUser() {
    if (this.userForm && this.userForm.valid) {
      // El formulario es válido, puedes enviar la solicitud al servidor
      console.log('Valores de newUser:', this.newUser);

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      const userData = {
        message: this.newUser.message,
        user: {
          name: this.newUser.name,
          email: this.newUser.email,
          username: this.newUser.username,
          password: this.newUser.password
        }
      };

      this.userService.createUser(userData).subscribe(
        (data) => {
          console.log('Usuario creado con éxito:', data);
          this.dialogRef.close('saved');  // Cierra el diálogo después de guardar
          this.router.navigate(['/users-list']);
        },
        (error) => {
          console.error('Error al crear el usuario:', error);
          if (error instanceof HttpErrorResponse) {
            console.error('Estado:', error.status);
            console.error('Texto del estado:', error.statusText);
            console.error('Cuerpo de la respuesta:', error.error);
            console.log('Valores de newUser:', this.newUser);
          }
        }
      );
    }
  }

  // Función para mostrar la alerta de confirmación
  confirmCancel() {
    if (confirm('¿Estás seguro de que deseas cancelar la creación del usuario?')) {
      this.dialogRef.close('canceled');  // Cierra el diálogo después de cancelar
      this.router.navigate(['/users-list']);
    }
  }
}
