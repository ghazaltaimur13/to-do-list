import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

class ToDoList extends Component {
    constructor(props){
      super(props);
      this.state = {
        items: props.items
      };
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.items!==this.props.items){
          this.setState({items: nextProps.items });
        }
    }

    render() {
        if(this.state.items.length > 0){
            return (<Grid item xs={12} md={6}><div>
                <List>
                {
                    this.state.items.map((itemList, index) => 
                    <ListItem key={index}>
                      <ListItemText
                        primary={itemList.item}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="Delete" onClick={(e) => this.props.deleteItem(itemList.id,index, e)} >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="Edit" onClick={(e) => this.props.editItem(itemList,index, e)} >
                          <CreateIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                )}
                </List></div></Grid>);
        } else {
            return (<Grid item xs={12} md={6}><div>
                <List> </List></div></Grid>);
        }
       
    }
}

export default ToDoList;