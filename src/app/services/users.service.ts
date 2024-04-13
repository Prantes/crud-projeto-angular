import { Injectable } from '@angular/core';

import{ AngularFirestore }from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {



  constructor(private dataBaseStore: AngularFirestore) { }

  getAllUsers(){
    return this.dataBaseStore.collection('users', user => user. orderBy('name')).valueChanges({idField:'firebaseId'}) as Observable<any[]>
  }

  addUser(user:User){
    return this.dataBaseStore.collection('users').add(user);
  }

  update(userId:string, user: User){
    return this.dataBaseStore.collection('user').doc(userId).update(user);
  }

  deletUser(){
    return this.dataBaseStore.collection('users').doc('userId').delete();
  }
}
