export default function(state={},action){
    switch(action.type){
        case 'INBOX':
            return {...state,inboxlist:action.payload};
        default:
        return state;
    }
}  