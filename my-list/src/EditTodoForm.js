import React, {Component} from 'react'
import './App.css'

export default class EditTodoForm  extends React.Component {
   constructor(props) {
      super(props)
      console.log('props',props)
   }
   render() {
      console.log('props',this.props)
      return (
         <div>
            {this.props.editUpdate && (
            <div id='update' className='panel-update'>
              <input value={this.props.editUpdate} onChange={(e) => this.props.handleChangeUpdate(e)}></input>
              <div className='btn-update'>
                <button onClick={(e) => this.props.btnUpdate(this.props.editIndex, e)}>Update</button>
                <button>Cancel</button>
              </div>
            </div>
          )}
         </div>
      )
   }
}