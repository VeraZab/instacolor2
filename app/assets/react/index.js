import MainView from '@views/MainView';
import React from 'react';
import Thunk from 'redux-thunk';
import appReducer from '@reducers/reducers';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {render} from 'react-dom';

var createStoreWithMiddleware = applyMiddleware(Thunk)(createStore);
const store = createStoreWithMiddleware(appReducer);

render(
    <Provider store={store}>
        <MainView/>
    </Provider>
    , document.getElementById('root')
);
