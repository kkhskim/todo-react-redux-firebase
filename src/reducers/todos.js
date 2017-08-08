import { LOAD_TODOS_SUCCESS } from '../constants/ActionTypes'

const initialState = [];

export default function todos(state = initialState, action) {
  switch (action.type) {
    case LOAD_TODOS_SUCCESS:
    	let todos = [];
    	if (action.response) {
    		Object.keys(action.response).forEach(key => {
    			let todo = action.response[key];
    			todos.unshift({
    				id: key,
    				completed: todo.completed,
    				text: todo.text
    			});
    		});
    	}
    	return [...todos];

    default:
      return state;
  }
}
