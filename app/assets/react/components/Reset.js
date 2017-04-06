import React, {Component, PropTypes} from 'react';
import {resetting} from '@actions/actions';

export default class Reset extends Component {
    constructor(props) {
        super(props);
        this.reset = this.reset.bind(this);
    }

    reset() {
        const {dispatch} = this.props;
        dispatch(resetting())
    }

    render() {
        return (
            <div className="reset" onClick={this.reset}>
                Reset
            </div>
        )
    }
}

Reset.proptypes = {
    dispatch: PropTypes.func.isRequired
}
