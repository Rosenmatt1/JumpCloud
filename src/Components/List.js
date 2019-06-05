import React from 'react'
import ListItem from './ListItem.js'

class List extends React.Component {

  render() {
    return (
      <ul>
        {this.props.reminders.map(reminder => {
          return <ListItem
            key={reminder.id}
            id={reminder.id}
            reminder={reminder}
            description={reminder.description}
            completed={this.props.completed}
            done={this.props.done}
            deleteReminder={this.props.deleteReminder}
            completedTask={this.props.completedTask}
            editReminder={this.props.editReminder}
          />
        })}
      </ul>
    )
  }
}

export default List