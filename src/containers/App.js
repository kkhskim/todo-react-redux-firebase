import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import * as TodoActions from '../actions';

class App extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

  componentWillMount() {
    this.props.actions.loadTodos();
  }

  render() {
    const { todos, actions } = this.props;
    return (
      <div>
        <TodoForm addTodo={actions.addTodo} />
        <TodoList todos={todos} actions={actions} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
