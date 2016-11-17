import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'


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
    simpleForm: FormGroup;

    /**
     * Creates an instance of AppComponent.
     *
     * @param {Store<AppState>} _store
     *
     * @memberOf AppComponent
     */
    constructor(private _store: Store<AppState>, private _fb: FormBuilder) {
        this.peopleArray = _store.select('people');

        this.simpleForm = _fb.group({
            'firstName': [null, Validators.required],
            'lastName': [null, Validators.required],
        });
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
