import React,{Component} from 'react';
import { Button, Form, Grid, Header, Segment ,Input,Message,Image, Modal} from 'semantic-ui-react'
import {connect} from 'react-redux';
import { loginUser } from '../actions';

class Login extends Component {

    state = {
        data:{
          username : "",
          password:"" 
        },
        loading:false, 
        errors:{}
    };    

    handleonChange = (e) =>{
        this.setState({
          data:{
            ...this.state.data,[e.target.name]:e.target.value
          }
        })
     }     
    
     
     SubmitForm =  (e) => {
       e.preventDefault()
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if(Object.keys(errors).length === 0){
          const isonline = navigator.onLine;
          if(isonline){
            this.props.loginUser(this.state.data,this.props.history)
          }else{
           alert('Dear User No Internet Connection Available');
          }
        }
   }
        
   
   validate = (data) =>{
     const errors = {};
     if(!data.username) errors.username = "Email Can't Be empty";
     if(!data.password) errors.password = "Passwrod Can't Be empty";
     return errors;
   }
  
    render (){  
      const {data,errors} = this.state;  
        return( 
     <div className='login-form'>
    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        {
         <Header as='h2' color='blue' textAlign='center'>
           Log-in To Your Account
        </Header>         
        }
        <Form size='large' onSubmit={this.SubmitForm}>
          <Segment raised>
          <Form.Field error={!!errors.username}>
          <Input 
              fluid icon='phone' 
              iconPosition='left' 
              placeholder='username' 
              value={data.email}
              onChange={this.handleonChange}
              id='username'
              name='username'    
            />
            <span style={{color:"#ae5856"}}>
            {errors.username && errors.username}
            </span>
          </Form.Field>
            


            <Form.Field error={!!errors.password}>
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              value={data.password}
              onChange={this.handleonChange}
              id='password'
              name='password'
            />  
            <span style={{color:"#ae5856"}}>
            {errors.password && errors.password}
            </span>
            </Form.Field>
                       
            <Button type="submit" color='blue' fluid size='medium' >
              Login
            </Button>
          </Segment>
          {
              this.props.user.login?  
                <div>
                   <Message negative  >
                   <Message.Header>
                        {this.props.user.login}
                   </Message.Header>
                  </Message>
                </div>
              :null 
            } 
        </Form>
      </Grid.Column>  
    </Grid> 
         </div>  
        ); 
    }   
}

function mapStateToProps (state){
    console.log(state);
  return {
        user:state.user
    }
}


export default connect(mapStateToProps, {loginUser})(Login);