import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { postData } from '../../api/Api';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
    username:'',
    password:''
    }
  }

  onLogin =  async () => {
    const { username, password  } = this.state;
    console.log('im')
    const response = await postData('login', {
      username: username,
      password: password
    });
    if(response.success === true){
      localStorage.setItem('token', response.token);
      console.log(localStorage.getItem('token'));
      axios.defaults.headers.Authorization =  response.token;
      this.forceUpdate()
    } else{
      localStorage.setItem('token', null);
      alert(response.message)
    }
  }
  render() {
    if(localStorage.getItem('token') !== null){
      return <Redirect to="/todolist" />
    } else {
      return (
      
        <div>
          <MuiThemeProvider>
            <div>
            <AppBar
              title="Login"
            />
            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange = {(event,newValue) => this.setState({username:newValue})}
            />
            <br/>
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange = {(event,newValue) => this.setState({password:newValue})}
            />
            <br/>
            <RaisedButton label="Submit" primary={true} style={style} onClick={this.onLogin}/>
          </div>
          </MuiThemeProvider>
        </div>
      );
    }
  }
}
const style = {
 margin: 15,
};
export default Login;