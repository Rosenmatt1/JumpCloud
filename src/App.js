import React, { Component } from 'react';
import './App.css';

const url = 'http://localhost:8004/api/todos'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reminders: []
    }
  }

  componentDidMount() {
    fetch(url)
      .then(data => data.json())
      .then(res => {
        this.setState({
          reminders: res
        })
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


      </div>
    )
  }
}

export default App;
