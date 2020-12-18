import {
    SHOW_ALERT,
    HIDE_ALERT
} from './alertTypes';


////////////////////////////////
///SHOW ALERT ACTION CREATOR///
///////////////////////////////
export function showAlertAction (alert) {
    return (dispatch) => {

        dispatch( showAlert(alert) )
    }
};

//Show alert action
const showAlert = alert => ({
    type: SHOW_ALERT,
    payload: alert
});

///////////////////////////////
///HIDE ALERT ACTION CREATOR///
///////////////////////////////
export function hideAlertAction () {
    return (dispatch) => {

        dispatch( hideAlert() );
    }
};

//Hide alert action
const hideAlert = () => ({
    type: HIDE_ALERT
})