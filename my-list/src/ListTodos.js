import React, { Component } from 'react';
import './App.css';

class ListTodos extends React.Component {
   constructor(props) {
      super(props) 
   }

   render() {
      console.log('isAddTodo: ', this.props.isAddTodo)
      return (
         <div>
            <div>student</div>
            {this.props.isAddTodo.map(item =>
               <div className='item'>
                  <div className='value' key={item.id}>
                     {item.valueItem}
                  </div>
                  <button className='delete' onClick={(e) => this.handleRemoveClick(item.id, e)}>delete</button>
                  <button className='update' onClick={(e) => this.handleUpdateClick(item.valueItem, e)}>update</button>
               </div>
            )}
         </div>
      )
   }
}
export default ListTodos;