import React,{Component} from 'react';
import { Table,Header } from 'semantic-ui-react'
import {getStatistics} from '../actions';
import {connect} from 'react-redux';


class Statistics extends Component {

  state = {
    data:{
     companyPhone:localStorage.getItem('companyPhone')
    },
  }
   
    
 componentWillMount(){
   this.props.dispatch(getStatistics(JSON.stringify(this.state.data)))
 }

      render() { 
            return( 
            <div> 
       <Header as='h3' textAlign='center'>
        Statistics About Your Question In Your Menu<br/>
       </Header> 
       <br/>
      
     <Table celled fixed singleLine>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Question Number</Table.HeaderCell>
        <Table.HeaderCell>Number Of Inquiries</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    {this.props.statistics.statistics.statistics && this.props.statistics.statistics.statistics != null ?
       this.props.statistics.statistics.statistics.Statistics.map((item,i)=>(
    <Table.Body key={i}>
      <Table.Row>
        <Table.Cell>{item.questionNumber}</Table.Cell>
        <Table.Cell>{item.inqueries}</Table.Cell>
      </Table.Row>
    </Table.Body>
     )):null
    }
     </Table>
      
            </div>
           );
          }
        }

        function  mapStateToProps (state){
          console.log(state)
          return {
            statistics:state
          }
        }
        
    

export default connect(mapStateToProps)(Statistics)