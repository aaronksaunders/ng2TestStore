import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {FormGroup, FormControl, Validators} from '@angular/forms'


/**
 *
 */
export interface Person {
  firstName : String,
  lastName : String,
  id : String,
}

interface AppState {
  /**
   *
   *
   * @type {Array<String>}
   * @memberOf AppState
   */
  peopleArray: Array<Person>;
}

/**
 *
 *
 * @export
 * @class AppComponent
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  /**
   *
   *
   * @memberOf AppComponent
   */
  title = 'app works!';

  /**
   *
   *
   * @memberOf AppComponent
   */
  peopleArray;
  simpleForm: FormGroup;

  /**
   * Creates an instance of AppComponent.
   *
   * @param {Store<AppState>} _store
   *
   * @memberOf AppComponent
   */
  constructor ( private _store: Store<AppState> ) {
    this.peopleArray = _store.select('people');
  }
  /**
   *
   * @memberOf AppComponent
   */
  ngOnInit () {
    this.simpleForm = new FormGroup({
      'firstName': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'lastName': new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }
  /**

   * @param {string} _controlName
   *
   * @memberOf AppComponent
   */
  errorHelper(_controlName:string) {
    let control = this.simpleForm.controls[_controlName]
    if (!control.pristine && control.errors) {
      return control.errors
    }
  }
  /**

   * @param {any} _person
   *
   * @memberOf AppComponent
   */
  addPerson(_person) {
    this
      ._store
      .dispatch({type: 'ADD_PERSON', payload: _person.value});

    // reset the form
    this.simpleForm.reset();

  }


  /**
   *
   * @param {any} _person
   *
   * @memberOf AppComponent
   */
  removePerson(_person) {
    this
      ._store
      .dispatch({type: 'REMOVE_PERSON', payload: _person});
  }
}
