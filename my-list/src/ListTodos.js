import React, { Component } from 'react';
import './App.css';

class ListTodos extends React.Component {
   constructor(props) {
      super(props) 
   }
   render() {
      return (
         <div>
            {this.props.isAddTodo.map(item =>
               <div className='item'>
                  <div className='value' key={item.id}>
                     {item.valueItem}
                  </div>
                  <button className='delete' onClick={(e) => this.props.handleRemove(item.id, e)}>delete</button>
                  <button className='update' onClick={(e) => this.props.handleUpdate(item.valueItem, e)}>update</button>
               </div>
            )}
         </div>
      )
   }
}
export default ListTodos;