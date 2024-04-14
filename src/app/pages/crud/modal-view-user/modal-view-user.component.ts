import { Component, Inject, inject } from '@angular/core';
import { User } from '../../../interfaces/user';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DIALOG_DATA } from '@angular/cdk/dialog';




@Component({
  selector: 'app-modal-view-user',
  templateUrl: './modal-view-user.component.html',
  styleUrl: './modal-view-user.component.scss',

})
export class ModalViewUserComponent {

  userData: User;

  constructor(
    public dialogRef:MatDialogRef <ModalViewUserComponent>,
    @Inject(MAT_DIALOG_DATA)public data:any
  ){
    this.userData=data;
     }

  closemodal(){this.dialogRef.close();}
}
