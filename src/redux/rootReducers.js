import { combineReducers } from 'redux';
import { productsReducer } from './products/productsReducer';
import { alertReducer } from  './alert/alertReducer';

//Combine reducers takes and object with many reduers and pass it to the store as one.
export default combineReducers({
    products:productsReducer,
    alert: alertReducer
});
