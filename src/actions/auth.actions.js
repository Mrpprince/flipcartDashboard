import { authConstant } from "./constant"
import axios from '../healpers/axios'

export const login = (user) => {
    console.log(user)
    return async (dispatch) => {
        dispatch({ type: authConstant.LOGIN_REQUEST })
        const res = await axios.post(`/admin/signin`, {
            ...user
        })

        if (res.status === 200) {
            const { token, user } = res.data;
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            dispatch({
                type: authConstant.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            })
        } else {
            if (res.status === 400) {
                dispatch({
                    type: authConstant.LOGIN_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                })
            }
        }

    }

}

export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstant.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            })
        }
        else {
            dispatch({
                type: authConstant.LOGIN_FAILURE,
                payload: {
                    error: "Failed to login"
                }
            })
        }
    }
}

export const signOut = () => {
    return async dispatch => {
        dispatch({ type: authConstant.LOGIN_REQUEST })
        const res = await axios.post(`/admin/signout`)
        if (res.status === 200) {
            localStorage.clear();
            dispatch({
                type: authConstant.LOGOUT_SUCCESS
            })
        }else{
            dispatch({
                type: authConstant.LOGOUT_SUCCESS,
                payload:{
                    error:res.data.error
                }
            })
        }

    }
}