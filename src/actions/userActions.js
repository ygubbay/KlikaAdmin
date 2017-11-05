

import axios from "axios";

export function loginUser(username, password) {

    //return {
    //    type: "LOGIN_OK",
    //    payload: { username: 'ygubbay'}
    //};

    return (dispatch) => {
        dispatch({type: "LOGIN_START", payload: null});
        axios.get("http://rest.learncode.academy/api/wstern/users")
            .then((response) => {
                dispatch({type: "LOGIN_OK", payload: response.data});
            })
            .catch((err) => {
                dispatch({ type: "LOGIN_FAIL", payload: err})
            })
    }
}


export function newTodo(todo) {
    return {
        type: "CREATE_TODO",
        payload: todo
    }
}