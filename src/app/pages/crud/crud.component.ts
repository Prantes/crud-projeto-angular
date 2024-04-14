import { Component, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { User } from '../../interfaces/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalViewUserComponent } from './modal-view-user/modal-view-user.component';
import { ModalFormUserComponent } from './modal-form-user/modal-form-user.component';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss'
})
export class CrudComponent {

  displayedColumns:string[] = ['id', 'name', 'email', 'role','benefits', 'action'];
  dataSource:any;
  listUsers:User[]=[];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

constructor(private userService: UsersService,
              public dialog:MatDialog,
){
  this.dataSource = new MatTableDataSource<any> (this.listUsers);
}

ngOnInit(){

  this.getListUsers();

}
//função para iniciar a páginação
ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}


//Função dos usuários
getListUsers(){
  this.userService.getAllUsers().subscribe({
    next:(response:any) =>{

      this.listUsers =response;

      this.dataSource = new MatTableDataSource <any>(this.listUsers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.paginator._intl.itemsPerPageLabel="Itens por páginas";

    },
    error:(err)=>{
      console.error(err);
    }
  });
}

deleteUser(firebaseId: string) {
    this.userService.deleteUser(firebaseId).then(
      (response:any)=>{
        window.alert ('Usuario excluido com sucesso')
      }
    );

}

// FIM DAS FUNÇÕES DOS USUARIOS
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  if(this.dataSource.paginator){
    this.dataSource.paginator.firstpage();
  }
}

//Logica Modal
openModalViewUser(user: User){
  this.dialog.open(ModalViewUserComponent,{
    width:'700px',
    height:'330px',
    data: user
  })
}

//rotina que atualiza as informações do banco de dados após a incerção/edição (firebase não precisa mas é bom em otros bancos)
openModalAddUser(){
  this.dialog. open(ModalFormUserComponent,{
    width:'700px',
    height:'410px',
  }).afterClosed().subscribe(()=> this.getListUsers);
}

openModalEditUser(user: User){
  this.dialog. open(ModalFormUserComponent,{
    width:'700px',
    height:'410px',
    data:user
  }).afterClosed().subscribe(()=> this.getListUsers);
}
}
