import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UserService } from '../../user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { EventEmitter, Output } from '@angular/core';

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

  @Output() userCreated: EventEmitter<void> = new EventEmitter<void>(); // Define el evento userCreated

  constructor(
    private router: Router, 
    private userService: UserService,
    private dialogRef: MatDialogRef<UserCreateComponent>
  ) {}

  createUser() {
    if (this.userForm && this.userForm.valid) {
      // El formulario es válido, puedes enviar la solicitud al servidor
  
      // Crea un objeto userData con los datos del formulario
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
  
          // Emitir el evento userCreated después de la creación exitosa
          this.userCreated.emit();
  
          this.dialogRef.close('created'); // Cierra el diálogo después de guardar
          this.router.navigate(['/users-list']);
        },
        (error) => {
          console.error('Error al crear el usuario:', error);
          if (error instanceof HttpErrorResponse) {
            // Manejo de errores
          }
      });
    }
  }
  

  confirmCancel() {
    // Cierre directo del diálogo sin mostrar una confirmación
    this.dialogRef.close('canceled');
    this.router.navigate(['/users-list']);
  }
}
