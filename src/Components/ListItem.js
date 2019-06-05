import React from 'react'

class ListItem extends React.Component {

  render() {
    return (
      <div>

        <li className={this.props.reminder.done === true ? "todo completed" : "todo incomplete"}>
          <span className="task"> Task: </span>  {this.props.reminder.edit === true ? 
          <textarea className="change"> </textarea> : this.props.description} 
        </li>

        <label className="check"> &nbsp; Check if Completed </label>

        <input
          className="mx-3"
          type="checkbox"
          value={this.props.id}
          onChange={(e) => this.props.completedTask(e)}
        />

        <button
          className="removeReminder text mx-3"
          onClick={() => this.props.deleteReminder(this.props.id)}
        >
          Remove
        </button>

        <button
          className="editReminder text mx-3"
          onClick={() => this.props.editReminder(this.props.id)}
        >
          Edit
        </button>

      </div>
    )
  }
}

export default ListItem