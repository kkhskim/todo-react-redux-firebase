import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

function TodoList(props) {
	const { todos, actions } = props;
	return (
		<ul className="todo-list">
			{todos.map(todo =>
				<TodoItem key={todo.id} todo={todo} {...actions} />
			)}
		</ul>
	);
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

export default TodoList;
