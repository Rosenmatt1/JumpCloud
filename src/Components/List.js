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
            description={reminder.description}
            done={this.props.done}
            deleteReminder={this.props.deleteReminder}
            completedTask={this.props.completedTask}
          />
        })}
      </ul>
    )
  }
}

export default List