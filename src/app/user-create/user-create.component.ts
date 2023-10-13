import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa el servicio Router
import { UserService } from '../user.service';


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
    password: ''
  };

  constructor(private router: Router, private userService: UserService) {}

  createUser() {
    this.userService.createUser(this.newUser).subscribe(
      (data) => {
        console.log('Usuario creado con éxito:', data);
        // Redirigir a la lista de usuarios u otra página deseada
        this.router.navigate(['/users']);
      },
      (error) => {
        console.error('Error al crear el usuario:', error);
      }
    );
  }
}
