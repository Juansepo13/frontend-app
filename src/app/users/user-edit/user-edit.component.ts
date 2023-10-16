import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent {
  user: any = {};
  userId: number;
  updatedMessage: string | undefined;

  @ViewChild('userForm') userForm?: NgForm;

  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.userId = +this.route.snapshot.params['id'];

    this.userService.getUserById(this.userId).subscribe(
      (userData) => {
        this.updatedMessage = userData.message;
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }

  updateUser() {
    const userData = { message: this.user.message };
    if (this.userForm && this.userForm.valid) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
  
      if (this.updatedMessage !== undefined) {
        // En lugar de enviar un objeto JSON, envía solo el valor de this.updatedMessage como una cadena.
        this.userService.updateUser(this.userId, { message: this.updatedMessage }).subscribe(
          (data) => {
            console.log('Usuario actualizado con éxito:', data);
            this.router.navigate(['/users']);
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
  }
  
  

  cancelEdit() {
    this.router.navigate(['/users']);
  }
}
