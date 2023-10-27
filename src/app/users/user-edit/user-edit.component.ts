import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup;
  editMode: boolean = true;
  originalUserData: any; // Guardar los datos originales del usuario

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = this.fb.group({
      name: [this.originalUserData?.name ?? '', Validators.required],
      email: [this.originalUserData?.email ?? '', [Validators.required, Validators.email]],
      username: [this.originalUserData?.username ?? '', Validators.required],
      message: [this.originalUserData?.message ?? ''],
      DNI: [this.originalUserData?.DNI ?? ''],
      telefono: [this.originalUserData?.telefono ?? ''],
      // Agrega otros campos del formulario aquí
    });
  }

  ngOnInit() {
    if (this.data.userId) {
      this.loadUser(this.data.userId);
    }
  }

  loadUser(userId: number) {
    this.userService.getUserId(userId).subscribe(
      (data) => {
        this.originalUserData = data; // Guarda los datos originales
        this.userForm.patchValue(data); // Carga los datos en el formulario
        this.editMode = true; // Habilita el modo edición
      },
      (error) => {
        console.error('Error al cargar el usuario por ID:', error);
      }
    );
  }
  

  onSave() {
    if (this.userForm.valid) {
      const userId = this.data.userId;
  
      const updatedUserData = {
        id: userId,
        name: this.userForm.get('name')?.value,
        DNI: this.userForm.get('DNI')?.value,
        email: this.userForm.get('email')?.value,
        telefono: this.userForm.get('telefono')?.value,
        username: this.userForm.get('username')?.value,
        message: this.userForm.get('message')?.value,
      };
  
      // Comprueba si se realizaron cambios en los campos del formulario
      if (!this.isDataChanged(updatedUserData, this.originalUserData)) {
        // No hay cambios, no se envía la solicitud
        this.dialogRef.close('no-changes');
      } else {
        this.userService.editUser(userId, updatedUserData).subscribe(
          () => {
            this.dialogRef.close('updated');
          },
          (error) => {
            console.error('Error al actualizar el usuario:', error);
            // Manejo de errores
          }
        );
      }
    }
  }
  

  isDataChanged(updatedData: any, originalData: any): boolean {
    return (
      updatedData.name !== originalData.name ||
      updatedData.email !== originalData.email ||
      updatedData.username !== originalData.username ||
      updatedData.message !== originalData.message ||
      updatedData.DNI !== originalData.DNI ||
      updatedData.telefono !== originalData.telefono
    );
  }

  onCancel() {
    this.dialogRef.close();
  }
}
