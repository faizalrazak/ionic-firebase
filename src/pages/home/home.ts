import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseProvider } from '../../providers/database/database';
import { AgeValidator } from '../../validators/age';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public addSongForm:FormGroup;
  public items: Array<any> = [];
  public itemRef: firebase.database.Reference = firebase.database().ref('/songs');

	constructor(public navCtrl: NavController, public formBuilder: FormBuilder, 
    public database: DatabaseProvider) {

    	// console.log(this.itemRef);

    	this.addSongForm = formBuilder.group({
    		songName: ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
		  	artistName: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
		  	userAge: ['', Validators.compose([Validators.required, AgeValidator.isValid])]
		});

  }

  ionViewDidLoad(){
  	this.itemRef.on('value', response => {
    // Here we'll work with the list
    response.forEach( songs => {
      this.items.push(songs.val());
      console.log(this.items);
      return false;
    });
  });
  }

  addSong(){
	  if (!this.addSongForm.valid){
	    console.log("Nice try!");
	  } else {
	    this.database.saveSong(this.addSongForm.value.songName, this.addSongForm.value.artistName, 
	      parseFloat(this.addSongForm.value.userAge)).then( () => {
	        this.addSongForm.reset();
	      });
	  }

	}


	getSong(){

	}

}
