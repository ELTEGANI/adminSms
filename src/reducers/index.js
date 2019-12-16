import {combineReducers} from 'redux';
import inbox from './inbox_reducer';
import user from './user_reducer';
import statistics from './stat_reducer';


const rootReducer = combineReducers({
    inbox,
    user,
    statistics
});

export default rootReducer; 