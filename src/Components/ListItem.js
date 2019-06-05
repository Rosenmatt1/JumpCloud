import React from 'react'

class ListItem extends React.Component {

  render() {
    return (
      <li className={this.props.done === true ? "completed" : "incomplete"}>

        Task: {this.props.description}
        <label> &nbsp; &nbsp; Check Box if Completed </label>

        <input
          type="checkbox"
          value={this.props.id}
          onChange={this.props.completedTask}
          className="mx-3"
        />

        <button
          className="removeReminder mx-3"
          onClick={() => this.props.deleteReminder(this.props)}
        >
          Remove
        </button>

      </li>
    )
  }
}

export default ListItem