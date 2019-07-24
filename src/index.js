import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import ReactDOM from  'react-dom';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers'; 
import Routes from './routes';
import 'semantic-ui-css/semantic.min.css';
     
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware,ReduxThunk)(createStore)
 
ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )}>
         <BrowserRouter>
           <Routes/>
          </BrowserRouter>  
    </Provider>
,document.getElementById('root'))