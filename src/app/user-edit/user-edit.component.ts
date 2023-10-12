import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  user: any; // Aquí almacenaremos los detalles del usuario
  updatedMessage: string = '';

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const userId = params['id'];
      this.loadUserDetails(userId); // Llama a la función para cargar los detalles del usuario al iniciar el componente
    });
  }

  loadUserDetails(userId: number) {
    this.userService.getUserById(userId).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Error al cargar los detalles del usuario:', error);
      }
    );
  }

  updateMessage() {
    this.userService.updateUser(this.user.id, this.updatedMessage).subscribe(
      (data) => {
        console.log('Usuario actualizado:', data);
      },
      (error) => {
        console.error('Error al actualizar el usuario:', error);
      }
    );
  }
}
