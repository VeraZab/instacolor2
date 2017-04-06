import React, {Component, PropTypes} from 'react';
import {extractedColor} from '@actions/actions';
import {rgbToHsl} from '@utils/color';

export default class ImageContainer extends Component {
    constructor(props) {
        super(props);
        this.loaded = this.loaded.bind(this);
    }

    loaded() {
        const {dispatch} = this.props;

        const colorThief = new ColorThief();
        const image = this.refs.instaImage;
        const rgbColor = colorThief.getColor(image);
        const hsl = rgbToHsl(rgbColor[0], rgbColor[1], rgbColor[2]);

        setTimeout(() => {
            dispatch(extractedColor(hsl));
            this.refs.container.style.backgroundColor = `hsl(${hsl[0]},${hsl[1]}%,${hsl[2]}%)`;
            image.style.opacity = 0;
        }, 3000);
    }

    render() {
        const {href} = this.props;

        return (
            <div className="imageContainer" ref="container">
                <img
                    ref="instaImage"
                    src={href}
                    onLoad={this.loaded}
                />
            </div>
        );
    }
}

ImageContainer.proptypes = {
    dispatch: PropTypes.func.isRequired,
    href: PropTypes.string.isRequired
}
