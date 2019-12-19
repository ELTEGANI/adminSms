export default function(state={},action){
    switch(action.type){
        case 'menu':
            return {...state,menu:action.payload};
        default:
        return state;
    }
}  