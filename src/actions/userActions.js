

import axios from "axios";
import * as api from "../api";

export function loginUser(username, password) {



    // return {
    //    type: "LOGIN_OK",
    //    payload: { username: 'ygubbay'}
    // };

    return (dispatch) => {
        dispatch({type: "LOGIN_START", payload: null});
        //axios.get("http://rest.learncode.academy/api/wstern/users")
        api.login(username, password)
            .then((response) => {

                if (response.data.is_error)
                {
                    dispatch({ type: "LOGIN_FAIL", payload: response.data.error_message});
                }
                else {
                    dispatch({type: "LOGIN_OK", payload: response.data});
                }
            })
            .catch((err) => {
                dispatch({ type: "LOGIN_FAIL", payload: err});
            })
    }
}

export function dismissAlerts() {

    return {
        type: "DISMISS_ALERTS",
        payload: null
    }
}


export function newTodo(todo) {
    return {
        type: "CREATE_TODO",
        payload: todo
    }
}