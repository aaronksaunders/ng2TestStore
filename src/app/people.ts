import {ActionReducer, Action} from '@ngrx/store';
import {UUID} from 'angular2-uuid';

export const peopleReducer: ActionReducer<any> = (state = [], action: Action) => {
    switch (action.type) {

        case 'ADD_PERSON':
            let uuid = UUID.UUID();
            return [
                ...state,
                Object.assign({id: uuid}, action.payload)
            ];

        case 'REMOVE_PERSON':

            let idx = state.findIndex((_item) => {
                return action.payload.id === _item.id;
            })

            if (idx === -1) {
                return state;
            } else {
                return [
                    ...state.slice(0, idx),
                    ...state.slice(idx + 1)
                ]
            }

        default:
            return state;

    }
}