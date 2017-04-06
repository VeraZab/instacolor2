import COLOR_DEFINITIONS from '@constants/color';
import React, {Component, PropTypes} from 'react';
import Reset from '@components/Reset';
import {hslToColor} from '@utils/color';

export default class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colorName: null,
            hsl: null,
            result: null
        }
    }

    componentWillMount() {
        const {extractedColors, imageUrls} = this.props;

        const frequencies = {};

        const filteredFromOutliers = extractedColors.filter(color => {
            return (
                color[2] < 90 &&  // color[2] = lightness, lightness > 90 == too light
                color[2] > 7 && // too dark
                color[1] > 50 // color[1] = saturation, saturation < 25 == too dull
            );
        });

        if (filteredFromOutliers.length == 0) {
            this.setState({
                mainColor: '',
                result: 'You are mysterious'
            });
            return;
        };

        filteredFromOutliers.forEach(color => {
            const colorName = hslToColor(color);

            if (frequencies.hasOwnProperty(colorName)) {
                frequencies[colorName].count += 1;
                frequencies[colorName].saturation += color[1];
                if (frequencies[colorName].mostSaturatedColor[1] < color[1]) {
                    frequencies[colorName].mostSaturatedColor = color;
                };
            }

            else {
                frequencies[colorName] = {
                    count: 1,
                    saturation: color[1],
                    mostSaturatedColor: color
                };
            }
        });

        let mostSaturatedColor;
        const mainColor = Object.keys(frequencies).reduce((a, b) => {
            if (frequencies[b].count > frequencies[a].count) {
                mostSaturatedColor = frequencies[b].mostSaturatedColor;
                return b;
            }
            if (frequencies[b].count == frequencies[a].count) {
                if (frequencies[b].saturation > frequencies[a].saturation) {
                    mostSaturatedColor = frequencies[b].mostSaturatedColor;
                    return b;
                } else {
                    mostSaturatedColor = frequencies[a].mostSaturatedColor;
                    return a;
                }
            } else {
                mostSaturatedColor = frequencies[a].mostSaturatedColor;
                return a;
            }
        });

        const result = COLOR_DEFINITIONS
                        .filter(color => color.name == mainColor)[0].attributes
                        .slice(0, 3);

        this.setState({
            colorName: mainColor,
            hsl: mostSaturatedColor,
            result: result
        });
    }

    render() {
        const {colorName, result, hsl} = this.state;
        const {dispatch} = this.props;
        let content = result;
        let style = {backgroundColor: 'black'};

        if (colorName) {
            style.backgroundColor = `hsl(${hsl[0]},${hsl[1]}%,${hsl[2]}%)`;
            content = `Your color is ${colorName}. You are ${result.join(', ')}.`
        }

        return (
            <div className="result" style = {style}>
                {content}
                <Reset dispatch={dispatch}/>
            </div>
        )
    }
}

Results.propstypes = {
    extractedColors: PropTypes.array.isRequired,
    imageUrls: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
}
