import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent implements OnInit {
  user: any; // Aquí almacenaremos los detalles del usuario

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

  deleteUser() {
    this.userService.deleteUser(this.user.id).subscribe(
      () => {
        console.log('Usuario eliminado con éxito.');
      },
      (error) => {
        console.error('Error al eliminar el usuario:', error);
      }
    );
  }
}
