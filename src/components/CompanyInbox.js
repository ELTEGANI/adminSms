import React,{Component} from 'react';
import {Button,Message,Item,Header} from 'semantic-ui-react'
import {connect} from 'react-redux';
import {getInboxList} from '../actions';
import axios from 'axios'


class CompanyInbox extends Component {
   
   state = {
     data:{
      companyPhone:localStorage.getItem('companyPhone')
     },
     replay:'',
     msgerror:''
   }
    
     
  componentWillMount(){
    this.props.dispatch(getInboxList(JSON.stringify(this.state.data)))
  }

  handleChange = (e) =>{
    this.setState({
      replay:e.target.value
    })
  } 
  


sendReplay = (userPhoneNumber,index) =>{
  console.log(this.state.senderPhone)
  const isonline = navigator.onLine;
  if(isonline){  
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'JWT ' +localStorage.getItem('accesstoken')
      }
    };
    let senderPhone = userPhoneNumber
    let sendReplayToUser = {
      companyPhone:localStorage.getItem('companyPhone'),
      userNumber:senderPhone
    }
    
    console.log(sendReplayToUser);
    axios.put(`http://172.105.87.5/api/companies/updateStatus`,JSON.stringify(sendReplayToUser),axiosConfig)
    .then(res => {   
      this.props.inboxlist.inbox.inboxlist.companyMessages.splice(index,1);
    this.setState({replay:"",senderPhone:"",msgerror:res.data.message})
    })       
 }else{
  alert('Dear User No Internet Connection Available');
 }
  }

      render() { 
            return( 
            <div>
               <Header as='h3' textAlign='center'>
                Messages From Users
             </Header> 
             <div>
         {this.state.msgerror?  
         <Message positive>
         <Message.Header>
          {this.state.msgerror}
         </Message.Header>
         </Message>
         :null
         }
       </div>
             <br/>
              {this.props.inboxlist.inbox.inboxlist && this.props.inboxlist.inbox.inboxlist.companyMessages != null ?
                this.props.inboxlist.inbox.inboxlist.companyMessages.map((item,i)=>(
                <Item.Group key={i}>
               <Item>    
                <Item.Content>
                  <label>{item.senderPhone}</label>
                  <Item.Meta color='black'>{item.incomingMessages}</Item.Meta>
                    <Button floated='left' color='blue'
                    onClick={this.sendReplay.bind(this,item.senderPhone,i)}
                    >Done Contact</Button>  
                </Item.Content>
              </Item> 
             </Item.Group> 
              )):null
              }
            </div>
           );
          }
        }

        function  mapStateToProps (state){
          console.log(state)
          return {
            inboxlist:state
          }
        }
        
    

export default connect(mapStateToProps)(CompanyInbox)