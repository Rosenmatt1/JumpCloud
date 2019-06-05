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
    e.preventDefault()
    console.log("e", e.target.value)
    let completedItem = this.state.reminders.filter(reminder => {
      return reminder.id === Number(e.target.value)
    })
    console.log("Completed Item", completedItem)
    completedItem[0].done === true ? completedItem[0].done = false : completedItem[0].done = true
    this.setState({
      reminders: this.state.reminders
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
      id: this.state.reminders[this.state.reminders.length -1].id + 1,
      done: this.state.done,
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
    console.log("editReminder")
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
    console.log("editedDescription")
    this.setState({
      newDescription: e.target.value
    })
  }

  saveChanges = async (id) => {
    // e.preventDefault()
    console.log(id)
    // const editedReminder = {
    //   description: this.state.newDescription,
    // }
    const mappedReminders = this.state.reminders.map(reminder => {
      if (id === reminder.id && reminder.edit === true) {
        reminder.description = this.state.newDescription
      }
      return reminder
    })
    // await fetch(`url${this.state.reminders[this.state.index].id}`, {
    //   method: 'PUT',
    //   body: JSON.stringify(editedReminder),
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //   }
    // })
    this.setState({
      reminders: mappedReminders,
      edit: false
    })
  }

  render() {
    return (
      <div className="App">

        <h1 className="title"> The Jump Cloud To Do List </h1>
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
