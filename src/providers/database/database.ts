import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(public http: Http) {
    console.log('Hello DatabaseProvider Provider');
  }


	saveSong(songName: string, artistName: string, userAge: number): any {
	    return firebase.database().ref('songs').push({ songName, artistName, userAge });
	}
}
