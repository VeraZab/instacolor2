import React, {Component, PropTypes} from 'react';
import {getUserPictures, showResult} from '@actions/actions';

export default class Search extends Component {
	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this);
		this.focusInput = this.focusInput.bind(this);
	}

	focusInput() {
		this.refs.searchField.setSelectionRange(1,1);
	}

	submit(e) {
		const {dispatch} = this.props;
		const searchField = this.refs.searchField;

		if ((e.keyCode || e.which) === 13) {
			searchField.blur();
			dispatch(getUserPictures(searchField.value));
		}
	}

	render() {
		return (
			<div className="header">
				<div>
					<h1 className="header__question">
						What do your Instagram colors say about you?
					</h1>
					<input
						className="header__form"
						type="text"
						autoComplete="off"
						autoFocus='on'
						defaultValue="@"
						ref="searchField"
						onKeyPress={this.submit}
						onFocus={this.focusInput}
					/>
				</div>
			</div>
		);
	}
};

Search.PropTypes = {
	dispatch: PropTypes.func.isRequired,
};
