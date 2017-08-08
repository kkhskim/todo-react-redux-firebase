import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TodoInput from './TodoInput';

export default class TodoItem extends Component {
	static propTypes = {
		completeTodo: PropTypes.func.isRequired,
		deleteTodo: PropTypes.func.isRequired,
		editTodo: PropTypes.func.isRequired,
		todo: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);
		this.state = { editing: false };
	}

	handleEdit = () => {
    this.setState({ editing: true });
  }

	handleSave = (id, text) => {
		if (this.state.editing) {
			const { todo } = this.props;
			if (text.length && text !== todo.text) {
				this.props.editTodo(id, text);
			}

			this.setState({ editing: false });
		}
	}

	handleDelete = () => {
		this.props.deleteTodo(this.props.todo.id);
	}

	handleComplete = () => {
		this.props.completeTodo(this.props.todo.id, !this.props.todo.completed);
	}

	handleEditCancel = () => {
		this.setState({ editing: false });
	}

	render() {
		const editing = this.state.editing;
		const todo = this.props.todo;
		
		let item;
		if (this.state.editing) {
			item = (
				<div>
					<TodoInput text={todo.text} editing
										 onSave={(text) => this.handleSave(todo.id, text)} />
					<button className="cancel" onClick={this.handleEditCancel} />
				</div>
			);
		} else {
			item = (
				<div>
          <input className="toggle"
                 type="checkbox"
                 checked={todo.completed}
                 onChange={this.handleComplete} />
          <label>{todo.text}</label>
          <button className="edit" onClick={this.handleEdit}>Edit</button>
          <button className="delete" onClick={this.handleDelete}>Delete</button>
        </div>
			);
		}

		return (
			<li className={classnames({
        completed: todo.completed,
        editing: editing
      })}>
        {item}
      </li>
		);
	}
}