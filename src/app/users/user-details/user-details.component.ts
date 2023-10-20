import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../user.interface'; // Importa la interfaz User

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  @Input() selectedUserDetails: User = {} as User;
  userId!: number;
  dialogRef: MatDialogRef<UserDetailsComponent>;
  router: Router;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    dialogRef: MatDialogRef<UserDetailsComponent>,
    router: Router
  ) {
    this.dialogRef = dialogRef;
    this.router = router;

    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });
  }

  ngOnInit() {
    if (this.userId !== undefined) {
      this.loadUserDetails(this.userId);
    }
  }

  loadUserDetails(userId: number) {
    this.userService.getUserId(userId).subscribe(
      (data: User) => {
        this.selectedUserDetails = data;
        console.log('Datos del usuario:', data); // Agrega esta línea para mostrar los datos en la consola
      },
      (error) => {
        console.error('Error al cargar los detalles del usuario:', error);
      }
    );
  }
  
  confirmCancel() {
    this.dialogRef.close('canceled');
    this.router.navigate(['/users-list']);
  }
}
