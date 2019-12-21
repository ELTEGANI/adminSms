
import React,{Component} from 'react';
import {getMenu} from '../actions';
import {connect} from 'react-redux';
import {Form,Button,Message,Header, Input, MenuMenu} from 'semantic-ui-react'
import axios from 'axios';


class UpdateMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data:{
        companyPhone:localStorage.getItem('companyPhone')
       }, 
      questionsandanswer: [],
      errors: {},
      msgerror:'',
      targetValue:'',
      companyid:localStorage.getItem('companyPhone'),
      companyName:localStorage.getItem('companyName'),
      ownerName:localStorage.getItem('ownerName')
    }
     this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentWillMount(){
    this.props.dispatch(getMenu(JSON.stringify(this.state.data)))
  }

  componentWillReceiveProps(nextProps){
    let menu = nextProps.menu.menu.menu;
    menu.forEach((item,i) => {   
    this.setState(prevState => ({ 
    questionsandanswer: [...prevState.questionsandanswer, {
      questions:item.questions,
      answers:item.answers,
      questionorder:item.questionorder
     }]
 }))
})
 }


  
  showUi(){          
    return this.state.questionsandanswer.map((el,i) => (
      <div key={i}>
      <label>{`${i + 1}-Question & Answer`}</label>  
      <Input 
       placeholder="question" 
       name="questions" 
       value={el.questions ||''}
       onChange={this.createHandleChange.bind(this, i)} 
       />
       <br/>
       <br/>
       <Input 
       placeholder="answer" 
       name="answers" 
       value={el.answers || ''}
       onChange={this.createHandleChange.bind(this, i)} 
       />
      
      <Input 
       placeholder="questionorder" 
       name="questionorder" 
       style={{display: 'none'}}
       value={el.questionorder || ''}
       onChange={this.createHandleChange.bind(this, i)} 
       />
     
     <Input 
       name="companyid" 
       style={{display: 'none'}}
       value={el.companyid = localStorage.getItem('companyPhone')}
       onChange={this.createHandleChange.bind(this, i)} 
       />

      <input  
       type='button' 
       value='Remove' 
       onClick={this.removeClick.bind(this, i)}
       />
      </div>  
    ))
 }

 removeClick(i){
  let questionsandanswer = [...this.state.questionsandanswer];
  questionsandanswer.splice(i, 1);
  this.setState({ questionsandanswer });
}

questionhandleChange = (e) => {
  if(!!this.state.errors[e.target.name]){
    let errors = Object.assign({},this.state.errors);
    delete errors[e.target.name]
    this.setState({
      [e.target.name]:e.target.value,errors
    })
  }else{
    this.setState({
      [e.target.name]:e.target.value
    })
  }
} 


validate = () =>{
  const errors = {};
  if(this.state.question === '') errors.question = "Question Can't Be Empty";
  return errors; 
}  

createHandleChange(i, e) {
  const { name, value } = e.target;
  let questionsandanswer = [...this.state.questionsandanswer];
  questionsandanswer[i] = {...questionsandanswer[i], [name]: value};
  this.setState({ questionsandanswer });
}
  


addClick(){
   this.setState(prevState => ({ 
    questionsandanswer: [...prevState.questionsandanswer, { questions:"",answers: "",questionorder:""}]
  }))
}

handleSubmit(event) {
  event.preventDefault();
  const errors = this.validate();
  this.setState({errors});
  const isValid = Object.keys(errors).length === 0;
  if(isValid){
    const isonline = navigator.onLine;
    if(isonline){
      let axiosConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization':'JWT ' +localStorage.getItem('accesstoken')
        }
       }; 
       console.log(JSON.stringify(this.state))
      axios.post('http://127.0.0.1:5000/api/companies/updatemenus',JSON.stringify(this.state),axiosConfig)
    .then(response=>{
        this.setState({
          msgerror:response.data.message
        })
    }).catch(error=>{
            console.log(error) 
    }) 
    }else{
      alert('Dear User No Internet Connection Available');
    }
  }
}


  
  render() { 
    return(  
      <div>  
     <Header as='h3' textAlign='center'>
     Update your Menu
    </Header> 
    <br/>
       <br/>
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
       <br/>
   <Form onSubmit={this.handleSubmit}>
       <Form.Field>
        <div> 
       {this.showUi()}        
      <input type='button' 
       value='Add' onClick={this.addClick.bind(this)}/>
       </div> 
       </Form.Field>  
       <br/>  
   <Button fluid color='yellow' >Create Menu</Button>
 </Form>
           </div>
         );
}

}

function  mapStateToProps (state){
  console.log(state)
  return {
    menu:state
  }
}



export default connect(mapStateToProps)(UpdateMenu)