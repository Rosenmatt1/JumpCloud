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

      </div>
    )
  }
}

export default App;
