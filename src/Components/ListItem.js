import React from 'react'

class ListItem extends React.Component {

  render() {
    return (
      <div>

        <li className={this.props.done === true ? "todo completed" : "todo incomplete"}>
          <span className="task">Task: {this.props.description} </span>
        </li>

        <label className="check"> &nbsp; Check if Completed </label>

        <input
          type="checkbox"
          value={this.props.id}
          onChange={this.props.completedTask}
          className="mx-3"
        />

        <button
          className="removeReminder text mx-3"
          onClick={() => this.props.deleteReminder(this.props)}
        >
          Remove
        </button>

      </div>
    )
  }
}

export default ListItem