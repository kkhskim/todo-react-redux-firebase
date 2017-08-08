import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoInput from './TodoInput';

export default class TodoForm extends Component {
	static propTypes = {
		addTodo: PropTypes.func.isRequired
	}

	handleSave = (text) => {
		if (text.length) {
			this.props.addTodo(text);
		}
	}

	render() {
		return (
      <div className="todo-form">
        <h1>My Todos</h1>
        <TodoInput adding onSave={this.handleSave} />
      </div>
    );
	}
}