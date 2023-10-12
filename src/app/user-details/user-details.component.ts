import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: any; // Aquí almacenaremos los detalles del usuario

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const userId = params['id'];
      this.loadUserDetails(userId); // Llama a la función para cargar los detalles del usuario
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
}
