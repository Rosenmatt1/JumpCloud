import React from 'react'
import ListItem from './ListItem.js'

class List extends React.Component {

  render() {
    return (
      <div className="container">
        <ul>
          {this.props.reminders.map(reminder => {
            return <ListItem
              key={reminder.id}
              id={reminder.id}
              reminder={reminder}
              description={reminder.description}
              edit={this.props.edit}
              deleteReminder={this.props.deleteReminder}
              completedTask={this.props.completedTask}
              editedDescription={this.props.editedDescription}
              editReminder={this.props.editReminder}
              saveChanges={this.props.saveChanges}
            />
          })}
        </ul>
      </div>
    )
  }
}

export default List