import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-modal-form-user',
  templateUrl: './modal-form-user.component.html',
  styleUrl: './modal-form-user.component.scss'
})
export class ModalFormUserComponent {

  planosSaude =[
    {
      id:1,
      descricao:'Plano 300 Enfermaria'
    },
    {
      id:1,
      descricao:'Plano 400 Enfermaria'
    },
    {
      id:1,
      descricao:'Plano 500 Plus'
    },
  ];

  planosOdonto =[
    {
      id:1,
      descricao:'Plano basic'
    },
    {
      id:1,
      descricao:'Plano Medium'
    },
    {
      id:1,
      descricao:'Plano Plus'
    },
  ];
formUser:FormGroup;

constructor(
  public dialogRef:MatDialogRef<ModalFormUserComponent>,
  private formBuilder: FormBuilder,
  private UsersService: UsersService

){}

  ngOnInit(){
    this.buildForm();
  }

  //SALVAR USUARIOS
saveUser(){
    const objUserForm: User = this.formUser.getRawValue();
    this.UsersService.addUser(objUserForm).then(
      (Response:any) =>{
        window.alert('Usuário Salvo com sucesso');
        this.closeModal();
      })
      .catch(err =>{
        window.alert('Houve um erro ao salvar o usuário');
        console.error(err);
      });
}


  buildForm(){
    this.formUser = this.formBuilder.group({
      name:[null,[Validators.required, Validators.minLength(3)]],
      email:[null,[Validators.required, Validators.email]],
      sector:[null,[Validators.required, Validators.minLength(2)]],
      role:[null,[Validators.required, Validators.minLength(5)]],
      healthPlan:[''],
      dentalPlan:[''],
    })
  }

  closeModal(){this.dialogRef.close();}
}
