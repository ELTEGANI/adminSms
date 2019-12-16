export default function(state={},action){
    switch(action.type){
        case 'STATISTIC':
            return {...state,statistics:action.payload};
        default:
        return state;
    }
}  