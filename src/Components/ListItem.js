import React from 'react'

class ListItem extends React.Component {

  render() {
    return (
      <div className="block">

        <li className={this.props.reminder.done === true ? "todo completed" : "todo incomplete"}>
          <span className="task"> Task: </span>
          {this.props.reminder.edit === true
            ?
            <div>
              <input
                className="change"
                onChange={this.props.editedDescription}
                placeholder="Edit Task Here"
              />
              <button
                className="reminderButton text mx-3"
                onClick={() => this.props.saveChanges(this.props.id)}
              >
                Save
              </button>
            </div>
            :
              this.props.reminder.description
            } 
        </li>
  
        <label className="check"> &nbsp; Check if Completed </label>

          <input
            className="form-check-input mx-3"
            type="checkbox"
            checked={this.props.reminder.done}
            value={this.props.id}
            onChange={this.props.completedTask}
          />

          <button
            className="reminderButton text mx-3"
            onClick={() => this.props.deleteReminder(this.props.id)}
          >
            Remove
        </button>

          <button
            className="reminderButton text mx-3"
            onClick={() => this.props.editReminder(this.props.id)}
          >
            Edit
        </button>

      </div>
        )
      }
    }
    
export default ListItem