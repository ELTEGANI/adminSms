
import React,{Component} from 'react';
import {Form,Button,Message,Header, Input} from 'semantic-ui-react'
import axios from 'axios';


class createMenu extends Component {
   
  constructor(props) {
    super(props);
    this.state = { 
      questionsandanswer: [{question:"",answer:"",questionorder:"",companyid:""}],
      errors: {},
      msgerror:'',
      targetValue:'',
      companyid:localStorage.getItem('companyPhone')
    }
     this.handleSubmit = this.handleSubmit.bind(this);
  }
   
    
  showUi(){
    return this.state.questionsandanswer.map((el,i) => (
      <div key={i}>
      <label>{`${i + 1}-Question & Answer`}</label>  
      <Input 
       placeholder="question" 
       name="question" 
       value={el.question ||''}
       onChange={this.createHandleChange.bind(this, i)} 
       />
       <br/>
       <br/>
       <Input 
       placeholder="answer" 
       name="answer" 
       value={el.answer || ''}
       onChange={this.createHandleChange.bind(this, i)} 
       />
      
      <Input 
       placeholder="questionorder" 
       name="questionorder" 
       style={{display: 'none'}}
       value={el.questionorder = i + 1}
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
    questionsandanswer: [...prevState.questionsandanswer, { question:"",answer: "",questionorder:"",companyid:""}]
  }))
}

handleSubmit(event) {
  console.log(JSON.stringify(this.state))
  event.preventDefault();
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

       console.log(JSON.stringify(this.state));

      axios.post('http://127.0.0.1:5000/api/companies/createmenu',JSON.stringify(this.state),axiosConfig)
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


 render(){  
  const {errors} = this.state;  
  return(  
       <div>   
      <Header as='h2' textAlign='center'>
      Create New Menu
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


    <Button fluid color='yellow'>Create Menu</Button>

  </Form>
            </div>
          );
          
      }


}


export default createMenu