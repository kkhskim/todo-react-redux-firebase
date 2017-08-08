import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class TodoInput extends Component {
	static propTypes = {
		onSave: PropTypes.func.isRequired,
		editing: PropTypes.bool,
		adding: PropTypes.bool,
		text: PropTypes.string
	};

	constructor(props) {
		super(props);
		this.state = { text: this.props.text || '' };
	}

	clearInput = () => {
		this.setState({ text: '' });
	}

	handleChange = (event) => {
		this.setState({ text: event.target.value });
	}

	handleSave = (event) => {
		const text = this.state.text.trim();
		if (event.keyCode === 13) {
			this.props.onSave(text);
			if (this.props.adding) {
				this.clearInput();
			}
		}
	}

	handleBlur = (event) => {
		if (this.props.editing) {
			this.props.onSave(event.target.value);
		}
	}

	render() {
		const text = this.state.text;
		return (
			<input className={
				classnames({
					editing: this.props.editing,
					adding: this.props.adding
				})}
				autoComplete="off"
				autoFocus
				type="text"
				value={text} 
				placeholder="What needs to be done?"
				onChange={this.handleChange} 
				onKeyDown={this.handleSave} 
				onBlur={this.handleBlur} />
		);
	}
}