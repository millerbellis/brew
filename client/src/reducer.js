import uuidv4 from 'uuid';

export default function reducer(state, action, match) {
    switch(action.type){
        case "SET_USER":
            return {
                ...state,
                user: action.payload.cbrand,
                
            }
       
        default: 
        return state;
    }
}