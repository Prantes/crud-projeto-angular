import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
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
editUser:boolean =false;

constructor(
  public dialogRef:MatDialogRef<ModalFormUserComponent>,
  private formBuilder: FormBuilder,
  private UsersService: UsersService,
 @Inject(MAT_DIALOG_DATA) public data:any,

){}

  ngOnInit(){
    this.buildForm();
    if(this.data && this.data.name){
      this.editUser = true;
    }
  }

  //SALVAR USUARIOS
saveUser(){
          const objUserForm: User = this.formUser.getRawValue();

          if(this.data && this.data.name) {

            this.UsersService.update(this.data.firebaseId, objUserForm).then(
              (response:any)=>{
                window.alert('Usuário Editado com Sucesso');
                this.closeModal();
              })
              .catch(
                err =>{
                  window.alert('Houve um erro ao salvar o usuário');
                  console.error(err);
                });

              }else{
                this.UsersService.addUser(objUserForm).then(
                  (response:any)=>{
                    window.alert('Usuário salvo com sucesso');
                    this.closeModal();
                  })
                  .catch(err =>{
                    window.alert('Houve um erro ao salvar o usuário');
                    console.error(err);
                });
              }
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

    //caso o modal abra e tenha o fillform ele sera para edição caso contrario sera para adição de usuario
    if(this.data && this.data.name){
      this.fillForm();
    }
  }

//Preencher Form para edição
  fillForm() {
    this.formUser.patchValue({
      name:this.data.name,
      email:this.data.email,
      sector:this.data.sector,
      role:this.data.role,
      healthPlan:this.data.healthPlan,
      dentalPlan:this.data.dentalPlan,
    });
  }

  closeModal(){this.dialogRef.close();}
}
