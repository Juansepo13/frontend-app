import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Importa Router
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  user: any; 
  updatedMessage: string = '';
  userData: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router, // Importa Router
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const userId = params['id'];
      this.loadUserDetails(userId);
    });
  }

  loadUserDetails(userId: number) {
    this.userService.getUserById(userId).subscribe(
      (data) => {
        this.user = data; // Asigna los detalles del usuario a la variable 'user'
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
