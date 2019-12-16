import React,{Component} from 'react';
import {Container,Tab,Menu,Button} from 'semantic-ui-react'
import CompanyInbox from './CompanyInbox';
import CreateMenu from './createMenu';
import Statistics from './Statistics';

class DashBoard extends Component {
   
  
      render(){
        const panes = [
          { menuItem: 'Create Menu', render: () => <Tab.Pane><CreateMenu/></Tab.Pane> },
          { menuItem: 'Message Inbox', render: () => <Tab.Pane><CompanyInbox/></Tab.Pane> },
          { menuItem: 'Statistics', render: () => <Tab.Pane><Statistics/></Tab.Pane> }
        ]
          return(
            <div>                 
    <Container style={{paddingTop:20}} >
            <Menu>  
    <Container>
      <Menu.Item as="h2" header>
             SMS Admin    
      </Menu.Item>
    </Container>
    <Container>
      <Menu.Menu position="right">
        <Menu.Item name="logout">
        <Button  onClick={this.signOut}
         size='tiny' color='red'
        >SignOut</Button>
        </Menu.Item>
      </Menu.Menu>   
</Container>  
  </Menu>     
  </Container>

  <Container style={{paddingTop:0.8 + 'em'}}>
     <Tab menu={{ fluid: true, vertical: true }} menuPosition='left' panes={panes} />
  </Container>
          </div>
          );
          
      }


      signOut = () => {
        localStorage.clear();
        this.props.history.push('/');
}

}
      
export default DashBoard