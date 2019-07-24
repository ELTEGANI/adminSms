import React from 'react';
import {Switch,Route} from 'react-router-dom';
import DashBoard from './components/DashBoard';


const Routes = () => {
    return (
       <Switch>
           <Route path="/" exact  component={DashBoard} />
       </Switch>
       );
};


export default Routes; 