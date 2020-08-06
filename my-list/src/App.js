import React, { useImperativeHandle } from 'react';
import './App.css';
import ListTodos from './ListTodos'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      valueInput: '',
      valueUpdate: '',
      indexUpdate: 0,
      item: {
        id: new Date().getTime(),
        valueItem: ''
      }
    }
  }

  handleInputChange = (e) => {
    e.preventDefault()
    this.setState({
      valueInput: e.target.value,
    })

  }

  handleBtnClick = (e) => {
    e.preventDefault()
    const newTodo = {
      id: new Date().getTime(),
      valueItem: this.state.valueInput
    }
    const newTodos = [...this.state.todos, newTodo]
    this.setState({
      item: {
        id: new Date().getTime(),
        valueItem: this.state.valueInput
      },
      todos: newTodos,
      valueInput: '',
    })
    localStorage.setItem('listodo', JSON.stringify(this.state.todos))
  }

  handleRemoveClick = (id, e) => {
    const todoDel = this.state.todos.filter(item => item.id !== id)
    this.setState({
      todos: todoDel,
    })
    localStorage.setItem('listodo', JSON.stringify(this.state.todos))
  }

  handleUpdateClick = (value, e) => {
    e.preventDefault()
    const index = this.state.todos.find(item => item.valueItem === value)
    this.setState({
      valueUpdate: value,
      indexUpdate: index.id
    })
    localStorage.setItem('listodo', JSON.stringify(this.state.todos))
  }

  handleUpdateChange = (e) => {
    e.preventDefault()
    this.setState({
      valueUpdate: e.target.value
    })
  }

  clickUpdate = (index, e) => {
    console.log('index', index)
    e.preventDefault()

    this.state.todos.map(item => {
      if (item.id === index) {
        item.valueItem = this.state.valueUpdate
      }
    })

    this.setState({
      todos: this.state.todos,
      valueUpdate: ''
    })
  }

  componentDidMount = () => {
    const list = localStorage.getItem('listodo')
    const newlist = JSON.parse(list)
    this.setState({
      todos: newlist
    })
  }

  render() {
    return (
      <div className='form-todolist'>
        <input value={this.state.valueInput} placeholder='todoList...' onChange={(e) => this.handleInputChange(e)}></input>
        <button className='add' onClick={(e) => this.handleBtnClick(e)}>Add</button>

          {/* {{this.state.todos.map(item =>
            <div className='item'>
              <div className='value' key={item.id}>
                {item.valueItem}
              </div>
              <button className='delete' onClick={(e) => this.handleRemoveClick(item.id, e)}>delete</button>
              <button className='update' onClick={(e) => this.handleUpdateClick(item.valueItem, e)}>update</button>
            </div>
          )} } */}

        <ListTodos isAddTodo = {this.state.todos}></ListTodos>

        <EditTodoForm isEdit = {this.state.valueInput, this.state.valueUpdate, this.state.indexUpdate} ></EditTodoForm>
          {this.state.valueUpdate && (
            <div id='update' className='panel-update'>
              <input value={this.state.valueUpdate} onChange={(e) => this.handleUpdateChange(e)}></input>
              <div className='btn-update'>
                <button onClick={(e) => this.clickUpdate(this.state.indexUpdate, e)}>Update</button>
                <button>Cancel</button>
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default App;