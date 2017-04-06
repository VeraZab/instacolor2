const initialState = {
    username: null,
    imageUrls: [],
    status: null,
    extractedColors: []
};

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_USER_PICTURES':
            return Object.assign({}, state, {
                username: action.username,
                imageUrls: action.imageUrls,
                status: action.status
            });
        case 'EXTRACTED_COLOR':
            return Object.assign({}, state, {
                extractedColors: [
                    ...state.extractedColors,
                    action.color
                ]
            });
        case 'SHOW_RESULT':
            return Object.assign({}, state, {
                showResult: true
            });
        case 'RESET':
            return Object.assign({}, initialState);
        default:
            return state;
    }
};
