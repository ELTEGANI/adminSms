import React,{Component} from 'react';
import {Button,Modal,Item,Form,TextArea} from 'semantic-ui-react'
import {connect} from 'react-redux';
import {getInboxList} from '../actions';
import axios from 'axios'


class CompanyInbox extends Component {
   
   state = {
     data:{
      companyPhone:localStorage.getItem('companyPhone')
     },
     replay:'',
   }
    
     
  componentWillMount(){
    this.props.dispatch(getInboxList(JSON.stringify(this.state.data)))
  }

  handleChange = (e) =>{
    this.setState({
      replay:e.target.value
    })
  } 


sendReplay = (userPhoneNumber) =>{
  console.log(this.state.senderPhone)
  const isonline = navigator.onLine;
  if(isonline){  
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    let replay = this.state.replay
    let senderPhone = userPhoneNumber
    let sendReplayToUser = {companyid:localStorage.getItem('companyPhone'),senderPhone:senderPhone,replay:replay}
    axios.post(`http://127.0.0.1:5000/sendReplayToUser`,JSON.stringify(sendReplayToUser),axiosConfig)
    .then(res => { 
    console.log(res);
    this.setState({replay:"",senderPhone:""})
    })       
 }else{
  alert('Dear User No Internet Connection Available');
 }
  }

      render() { 
            return( 
            <div>
              {this.props.inboxlist.inbox.inboxlist && this.props.inboxlist.inbox.inboxlist.companyMessages != null ?
                this.props.inboxlist.inbox.inboxlist.companyMessages.map((item,i)=>(
                <Item.Group key={i}>
               <Item>    
                <Item.Content>
                  <label>{item.senderPhone}</label>
                  <Item.Meta color='black'>{item.incomingMessages}</Item.Meta>
                  <Modal centered={false} trigger={
                    <Button floated='left' color='blue'>Replay</Button>} 
                    closeIcon>
                   <Modal.Header><center>Send Replay To User</center></Modal.Header>
                   <Form>
    <Form.Field>
    <br/>
      <label>User:{item.incomingMessages}</label>
      <br/>
      <TextArea placeholder='your replay here' 
        defaultValue={this.state.replay}
        onChange={this.handleChange}
      />
    </Form.Field>   
    <br/>
    <Button  color='green' fluid  
     onClick={this.sendReplay.bind(this,item.senderPhone)}
    >Send Sms</Button>
    <br/>
  </Form>  

                  </Modal>
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