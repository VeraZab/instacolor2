import PicturesContainer from '@components/PicturesContainer';
import React, {Component, PropTypes} from 'react';
import Reset from '@components/Reset';
import Results from '@components/Results';
import Search from '@components/Search';
import {connect} from 'react-redux';

class MainView extends Component {
    constructor(props) {
        super(props)
    }

    showResult() {
        const {imageUrls, extractedColors} = this.props;
		return (imageUrls && extractedColors &&
				imageUrls.length > 0 && extractedColors.length > 0 &&
				imageUrls.length == extractedColors.length);
    }

    render() {
        const {
            imageUrls,
            status,
            username,
            dispatch,
            extractedColors
        } = this.props;

        switch (status) {
            case 'SUCCESS':
                if (this.showResult()) {
                    return (
                        <Results
                            dispatch={dispatch}
                            extractedColors={extractedColors}
                            imageUrls={imageUrls}
                        />
                    )
                } else {
                    return (
                        <PicturesContainer
                            dispatch={dispatch}
                            imageUrls={imageUrls}
                        />
                    );
                }
            case 'FAILURE':
                return (
                    <div className="errorState">
                        Sorry cannot find that user.
                        <Reset dispatch={dispatch}/>
                    </div>
                );
            default:
                return (
                    <Search
                        dispatch={dispatch}
                    />
                );
        }
    }
}

MainView.proptypes = {
    imageUrls: PropTypes.array,
    extractedColors: PropTypes.array,
    username: PropTypes.string,
    status: PropTypes.string
}

const mapStateToProps = state => {
    return {
        imageUrls: state.imageUrls,
        extractedColors: state.extractedColors,
        username: state.username,
        status: state.status
    }
}

export default connect(mapStateToProps)(MainView);
