import * as types from '../types/typeActions';

const initState = {
    guid: 'sss',
    name: 'sss',
    class: 'sss',
}

export default function(state, action) {
	if(state === undefined) state = initState;
    switch (action.type) {
        case types.ADD_NAME:
            return {
                ...state,
                name: action.payload
            }
        default:
            break;
    }
}