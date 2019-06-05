import React, { Component } from 'react';
import './App.css';
import List from './Components/List.js'

const url = 'http://localhost:8004/api/todos'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reminders: [],
      description: "",
      completed: false, 
      done: false,
      remove: false
    }
  }

  componentDidMount() {
    fetch(url)
      .then(data => data.json())
      .then(res => {
        this.setState({
          reminders: res,
        })
      })
  }

  completedTask = (e) => {
    e.preventDefault()
    let completedItem = this.state.reminders.filter(reminder => {
      return reminder.id === Number(e.target.value)
    })
    console.log("Completed Item", completedItem)
    completedItem[0].done === true ? completedItem[0].done = false : completedItem[0].done = true
    this.setState({
      completed: !this.state.completed
    })
  }

  // completedTask = (e) => {
  //   let completedItem = this.state.todos.filter(todo => {
  //     return todo.id === Number(e.target.value)
  //   })
  //   completedItem[0].completed === true ? completedItem[0].completed = false : completedItem[0].completed = true
  //   this.setState({
  //     todos: this.state.todos
  //   })
  // }

  addReminder = (e) => {
    e.preventDefault()
    this.setState({
      description: e.target.value
    })
  }

  createReminder = async (e) => {
    e.preventDefault()
    const newReminder = {
      id: this.state.reminders[this.state.reminders.length -1].id + 1,
      done: this.state.done,
      description: this.state.description
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(newReminder),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    await this.setState({
      reminders: [...this.state.reminders, newReminder],
      description: "",
    })
  }

  deleteReminder = async (id) => {
    const removeReminder = this.state.reminders.filter(item => {
      console.log("item.id", item.id)
      console.log("id", id)
      if (item.id === id) {
      }
      return item.id
    })
    console.log("removeReminder", removeReminder)
    const returnTheRest = this.state.reminders.filter(item => item.id !== id)
    console.log("returnTheRest", returnTheRest)
    await fetch(`http://localhost:8004/api/todos/${id}`, {
      method: 'DELETE',
      body: JSON.stringify(removeReminder),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    this.setState({
      reminders: returnTheRest,
    })
  }

  render() {
    return (
      <div className="App">

        <h1 className="title"> The Jump Cloud To Do List </h1>
        <i className="cloudIcon fas fa-cloud"></i>

        <List
          reminders={this.state.reminders}
          completed={this.state.completed}
          remove={this.state.remove}
          completedTask={this.completedTask}
          deleteReminder={this.deleteReminder}
        />

        <input 
          className="form-control"
          onChange={(e) => this.addReminder(e)} />

        <button
          className="addReminder mx-auto"
          onClick={(e) => this.createReminder(e)}
          placeholder={this.state.description}
          type="text"
        > Create New Reminder
        </button>

      </div>
    )
  }
}

export default App;
