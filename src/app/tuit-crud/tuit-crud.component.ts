import { Component, OnInit } from '@angular/core';
import { TuitService } from '../tuit.service';

@Component({
  selector: 'app-tuit-crud',
  templateUrl: './tuit-crud.component.html',
  styleUrls: ['./tuit-crud.component.scss'],
})
export class TuitCrudComponent implements OnInit {
  tuits: any[] = [];
  nuevoUsuario: any = {}; // Propiedad para almacenar los datos del nuevo usuario

  constructor(private tuitService: TuitService) {}

  ngOnInit() {
    this.loadTuits();
  }

  loadTuits() {
    this.tuitService.getTuits().subscribe((data) => {
      this.tuits = data;
    });
  }

  createTuit(message: string) {
    this.tuitService.createTuit(message).subscribe((response) => {
      // Manejar la respuesta, por ejemplo, mostrar un mensaje de éxito
      console.log('Tuit creado:', response);
      // Luego, cargar nuevamente la lista de tuits
      this.loadTuits();
    });
  }

  deleteTuit(id: number) {
    this.tuitService.deleteTuit(id).subscribe(() => {
      // Manejar la respuesta, por ejemplo, mostrar un mensaje de éxito
      console.log('Tuit eliminado');
      // Luego, cargar nuevamente la lista de tuits
      this.loadTuits();
    });
  }

  // Método para enviar los datos del nuevo usuario
  onSubmit() {
    // Lógica para enviar los datos del usuario al servidor o realizar el registro
    console.log('Datos del nuevo usuario:', this.nuevoUsuario);
    // Restablecer el formulario después del registro
    this.nuevoUsuario = {};
  }
}
