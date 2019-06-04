import React, { Component } from 'react';
import './App.css';

const url = 'http://localhost:8004/api/todos'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reminders: [],
      description: "",
      done: false
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

  createReminder = (e) => {
    e.preventDefault()
    const newReminder = {
      done: this.state.done,
      description: this.state.description
    }
    console.log(newReminder)
    fetch(`${url}reminders/`, {
      method: 'POST',
      body: JSON.stringify(newReminder),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    this.setState({
      reminders: [...this.state.reminders, newReminder],
    })
  }

  render() {
    return (
      <div className="App">

        <h1>The Jump Cloud To Do Tester</h1>

        {/* props.remindersTable.map((reminder, idx) => {
      return (
        <Card deleteReminder={props.deleteReminder} key={idx} reminder={reminder} />
      )
      }) */}

        {/* {this.state.reminders.map((reminder, idx) => {
          return <div key={idx} >
            {reminder}
          </div>
        })
        } */}

        <input onChange={(e) => this.addReminder(e)} />

      </div>
    )
  }
}

export default App;
