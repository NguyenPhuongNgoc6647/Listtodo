import React, { useImperativeHandle } from 'react'
import './App.css'
import ListTodos from './ListTodos'
import EditTodoForm from './EditTodoForm'

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
    if (this.state.valueInput) {
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
    }
    localStorage.setItem('listodo', JSON.stringify(this.state.todos))
  }

  handleRemoveClick = (id, e) => {
    const {todos} = this.state
    const todoDel = todos.filter(item => item.id !== id)
    this.setState({
      todos: todoDel,
    })
    localStorage.setItem('listodo', JSON.stringify(todos))
  }

  handleUpdateClick = (value, e) => {
    const {todos} = this.state
    e.preventDefault()
    const index = todos.find(item => item.valueItem === value)
    this.setState({
      valueUpdate: value,
      indexUpdate: index.id
    })
    localStorage.setItem('listodo', JSON.stringify(todos))
  }

  handleUpdateChange = (e) => {
    e.preventDefault()
    this.setState({
      valueUpdate: e.target.value
    })
  }

  clickUpdate = (index, e) => {
    const { todos, valueUpdate } = this.state
    e.preventDefault()

    todos.map(item => {
      if (item.id === index) {
        item.valueItem = valueUpdate
      }
    })

    this.setState({
      todos,
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
    // Sử dụng destructuring
    const { todos, valueInput, valueUpdate, indexUpdate } = this.state
    return (
      <div className='form-todolist'>
        <input value={valueInput} placeholder='todoList...' onChange={(e) => this.handleInputChange(e)}></input>
        <button className='add' onClick={(e) => this.handleBtnClick(e)}>Add</button>

        <ListTodos
          isAddTodo={todos}
          handleRemove={this.handleRemoveClick}
          handleUpdate={this.handleUpdateClick}>
        </ListTodos>

        <EditTodoForm
          editUpdate={valueUpdate}
          handleChangeUpdate={this.handleUpdateChange}
          editIndex={indexUpdate}
          btnUpdate={this.clickUpdate} >
        </EditTodoForm>
      </div>
    )
  }
}
export default App;