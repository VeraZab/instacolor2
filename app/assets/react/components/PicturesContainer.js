import ImageContainer from '@components/ImageContainer';
import React, {Component, PropTypes} from 'react';

export default class PicturesContainer extends Component {
    constructor(props){
        super(props)
    }

    render() {
        const {imageUrls, dispatch} = this.props;
        const pictures = imageUrls.map((image, index) => {
            return (
                <ImageContainer href={image} dispatch={dispatch} key={index}/>
            );
        });

        return (
            <div className="picturesContainer">
                {pictures}
            </div>
        );
    }
};

PicturesContainer.proptypes = {
    imageUrls: PropTypes.array,
    dispatch: PropTypes.func.isRequired
}
