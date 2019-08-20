import {combineReducers} from 'redux';
import inbox from './inbox_reducer';
import user from './user_reducer';


const rootReducer = combineReducers({
    inbox,
    user
});

export default rootReducer; 