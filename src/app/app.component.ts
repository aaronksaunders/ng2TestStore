import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Store} from '@ngrx/store';
import {FormGroup, FormControl, Validators} from '@angular/forms'

import {MdDialog, MdDialogRef, MdDialogConfig} from '@angular/material';

/**
 *
 */
export interface Person {
  firstName: String,
  lastName: String,
  id: String,
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


@Component({
  selector: 'demo-jazz-dialog',
  templateUrl: './dialog.html',
})
export class JazzDialog {
  jazzMessage = 'Jazzy jazz jazz';

  constructor(public dialogRef: MdDialogRef<JazzDialog>) {
  }
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
export class AppComponent implements OnInit {
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

  dialogRef: MdDialogRef<JazzDialog>;
  lastCloseResult: string;

  /**
   * Creates an instance of AppComponent.
   *
   * @param {Store<AppState>} _store
   *
   * @memberOf AppComponent
   */
  constructor(private _store: Store<AppState>, public _dialog: MdDialog, public viewContainerRef: ViewContainerRef) {
    this.peopleArray = _store.select('people');
  }

  /**
   *
   * @memberOf AppComponent
   */
  ngOnInit() {
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
  errorHelper(_controlName: string) {
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

   * @param {any} _person
   *
   * @memberOf AppComponent
   */
  editPerson(_person) {
    this
      ._store
      .dispatch({type: 'EDIT_PERSON', payload: _person.value});

    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;

    this.dialogRef = this._dialog.open(JazzDialog, config);

    this.dialogRef.afterClosed().subscribe(result => {
      this.lastCloseResult = result;
      this.dialogRef = null;
    });
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
