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
      newDescription: "",
      edit: false
    }
  }

  componentDidMount() {
    fetch(url)
      .then(data => data.json())
      .then(res => {
        let addEdit = res.map(reminder => {
          reminder.edit = false
          return reminder
        })
        this.setState({
          reminders: addEdit,
        })
      })
  }

  completedTask = (e) => {
    const mappedCompleted = this.state.reminders.map(reminder => {
      if (reminder.id === Number(e.target.value)) {
        reminder.done = !reminder.done
      }
      return reminder
    })
    this.setState({
      reminders: mappedCompleted
    })
  }

  addReminder = (e) => {
    e.preventDefault()
    this.setState({
      description: e.target.value
    })
  }

  createReminder = (e) => {
    e.preventDefault()
    const newReminder = {
      id: this.state.reminders[0] ? this.state.reminders[this.state.reminders.length - 1].id + 1 : 1,
      done: false,
      edit: false,
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
    this.setState({
      reminders: [...this.state.reminders, newReminder],
      description: "",
    })
  }

  deleteReminder = async (id) => {
    const removeReminder = this.state.reminders.filter(reminder => {
      if (reminder.id === id) {
      }
      return reminder.id
      
    })
    
    const returnTheRest = this.state.reminders.filter(reminder => reminder.id !== id)
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

  editReminder = (id) => {
    let editSelector = this.state.reminders.map(reminder => {
      if (reminder.id === id) {
        reminder.edit = !reminder.edit
      }
      return reminder
    })
    this.setState({
      reminders: editSelector
    })
  }

  editedDescription = (e) => {
    e.preventDefault()
    this.setState({
      newDescription: e.target.value
    })
  }

  saveChanges = async (id) => {
    const convertIdtoNumber = Number(id)
    const editedReminder = {
      id: convertIdtoNumber,
      description: this.state.newDescription,
      done: false,
      edit: false
    }
    const singleReminder = this.state.reminders.filter(reminder => reminder.id === id)
    const mappedReminders = this.state.reminders.map(reminder => {
      if (id === reminder.id && reminder.edit === true) {
        reminder.description = this.state.newDescription
      }
      return reminder
    })
    await fetch(`http://localhost:8004/api/todos/${singleReminder[0].id}`, {
      method: 'PUT',
      body: JSON.stringify(editedReminder),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    await this.setState({
      reminders: mappedReminders,
      edit: false
    })
    this.editReminder(id)
  }

  render() {
    return (
      <div className="App">

        <h1 className="title"> The JumpCloud To Do List </h1>
        <i className="cloudIcon fas fa-cloud"></i>

        <List
          reminders={this.state.reminders}
          edit={this.state.edit}
          completedTask={this.completedTask}
          deleteReminder={this.deleteReminder}
          editReminder={this.editReminder}
          editedDescription={this.editedDescription}
          saveChanges={this.saveChanges}
        />

        <input
          className="input form-control"
          value={this.state.description}
          placeholder={this.state.description === "" ? "Enter new task" : this.state.description}
          onChange={(e) => this.addReminder(e)} />

        <button
          className="addReminder mx-auto"
          onClick={(e) => this.createReminder(e)}
          type="text"
        > Create New Reminder
        </button>

      </div>
    )
  }
}

export default App;
