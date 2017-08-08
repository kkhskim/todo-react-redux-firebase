import * as types from '../constants/ActionTypes'
import { firebaseDb } from '../firebase'

const ref = firebaseDb.ref('todos');

export function loadTodosError(error) { 
	return { type: types.LOAD_TODOS_ERROR, error };
}

export function loadTodosSuccess(response) {
	return dispatch => {
		dispatch({ type: types.LOAD_TODOS_SUCCESS, response });
	}
}

// Subscribe todos
export function loadTodos() {
	return dispatch => {
		ref.on('value',
			snap => {
				const todos = snap.val();
				dispatch(loadTodosSuccess(todos));
			},
			error => dispatch(loadTodosError(error))
		);
	}
}

export function addTodo(text) {
	return dispatch => {
		ref.push({ text, user_id: '1', completed: false })
			.catch(error => dispatch({
				type: types.ADD_TODO_ERROR,
				error: error
			}));
	}
}

export function deleteTodo(id) {
	return dispatch => {
		ref.child(id)
				.remove()
				.catch(error => dispatch({
					type: types.DELETE_TODO_ERROR,
					error: error
			 }));
	}
}

export function clearCompleted() {
	return (dispatch, getState) => {
		let completedTodos = getState().todos.filter(todo => todo.completed);
		let updates = {};

		completedTodos.forEach(todo => {
			updates[todo.id] = null;
		});

		ref.update(updates);
	}
}

export function editTodo(id, text) {
	return updateTodo(id, { text: text }, types.EDIT_TODO_ERROR);
}

export function completeTodo(id, completed) {
	return updateTodo(id, { completed: completed }, types.COMPLETE_TODO_ERROR);
}

function updateTodo(id, update, errorType) {
	return dispatch => {
		ref.child(id)
				.update(update)
				.catch(error => dispatch({
					type: errorType,
					error: error
				}));
	}
}
