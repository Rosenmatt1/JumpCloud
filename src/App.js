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

  addReminder = (e) => {
    e.preventDefault()
    this.setState({
      description: e.target.value
    })
  }

  createReminder = async (e) => {
    e.preventDefault()
    const newReminder = {
      id: this.state.reminders.length + 1,
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
      if (item.id === id) {
      }
      return item.id
    })
    const returnTheRest = this.state.reminders.filter(item => item.id !== id)
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

        <h1>The Jump Cloud To Do Tester</h1>

        <List
          reminders={this.state.reminders}
          done={this.state.done}
          remove={this.state.remove}
          deleteReminder={this.deleteReminder}
        />

        <input onChange={(e) => this.addReminder(e)} />

        <button
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
