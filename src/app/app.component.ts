import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

interface AppState {
  /**
   * 
   * 
   * @type {Array<String>}
   * @memberOf AppState
   */
  peopleArray : Array<String>;
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

export class AppComponent {
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

  /**
   * Creates an instance of AppComponent.
   * 
   * @param {Store<AppState>} _store
   * 
   * @memberOf AppComponent
   */
  constructor(private _store : Store<AppState>) {
    this.peopleArray = _store.select('people');
  }
  /**
   * 
   * @param {any} _person
   * 
   * @memberOf AppComponent
   */
  addPerson(_person) {
    this
      ._store
      .dispatch({type: 'ADD_PERSON', payload : _person.value});
      _person.value = ''
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
      .dispatch({type: 'REMOVE_PERSON', payload : _person});
  }
}
