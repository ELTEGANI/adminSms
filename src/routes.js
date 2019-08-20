import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import DashBoard from './components/DashBoard';
import LoginForm from './components/LoginForm';
import {Component} from 'react';

class  Routes extends Component {



    render(){
        let routes = (
            <Switch>
             <Route path="/" exact  component={LoginForm} /> 
             <Redirect to="/"/>  
            </Switch>
        );
        
        const token = localStorage.getItem('access_token');
        
        if(token){
            console.log('ok done')
            routes = (
           <Switch>
                  <Route path="/DashBoard" exact  component={DashBoard} />
                  <Redirect to="/DashBoard"/>
           </Switch>
            );
        }


        return (
            <div>
             {routes}
            </div>
        );
    }
  
};


export default Routes; 