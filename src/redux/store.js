import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from './rootReducers';

//Redux's store where state and reducers to handle it are stored
const store = createStore(
    reducer,
    compose( applyMiddleware(thunk))
);

export default store;