import React, { Component } from 'react';
import ToDoList from './ToDoList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Input from '@material-ui/core/Input';
import { Redirect } from 'react-router-dom';
import { getData, postData } from '../../api/Api';

export default class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: '',
      items: [],
      itemId:''
    };
    
    
  }

  onChange = (event) => {
    this.setState({ item: event.target.value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    var idData = this.state.itemId.split("-");
    postData('addToDoList', {item:this.state.item, id:idData[0]}).then(res => {
      if(this.state.itemId){
        console.log(idData[1])
        const { items } = this.state;
        var itemData = items[idData[1]];
        itemData.item = this.state.item;
        items[idData[1]] = itemData;
        this.setState({
          items,
      });
      }else{
        this.setState({
          item: '',
          itemId: '',
          items: [...this.state.items, res]
        });
      }
      
    });
  }

  deleteItem = async (id,index) => {
    await postData('deleteItem', {id:id}).then(res => {
      this.state.items.splice(index,1);
      this.forceUpdate();
    });
  }

  editItem = async (item,index) => {
    this.setState({item: item.item ,itemId:item.id+'-'+index});
    this.forceUpdate();
  }

  logout = async () => {
    localStorage.clear();
    this.forceUpdate()
  }

  componentDidMount(){
    
    getData('getList').then(res => {
      if(res.success === true){
        this.setState({ items: JSON.parse(JSON.stringify(res.data)) });
        this.forceUpdate();
      }
    });
  }

  render() {
    console.log('render called');
    if(localStorage.getItem('token') !== null){
      return (
          <div>
          <MuiThemeProvider>
            <div>
            <AppBar
              title="To Do List"
            ><button onClick={this.logout}>Logout</button></AppBar>
              <Input
                value={this.state.itemId}
                type={'hidden'}
                name='id'
                id='id'
              />
              <TextField
                  hintText="Enter Item"
                  floatingLabelText="Item"
                  value={this.state.item}
                  onChange = {this.onChange}
              />
              <RaisedButton label="Submit" primary={true} onClick={this.onSubmit}/>
            </div>
          </MuiThemeProvider>
          <ToDoList items={this.state.items} item={this.state.item} deleteItem={this.deleteItem} editItem={this.editItem}/>
        </div>
      );
    } else {
      return (<Redirect to="/" />);
    }
  }
}
