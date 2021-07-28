import { authConstant } from "../actions/constant"

const initialState = {
    token: null,
    user: {
        firstName: "",
        lastName: "",
        email: "",
        picture: ""
    },
    authenticate: false,
    authenticating: false,
    loading: false,
    error: null,
    message: ""

}

export default (state = initialState, action) => {
    console.log(action)
    switch (action.type) {

        case authConstant.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true
            }
            break;
        case authConstant.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticating: false,
                authenticate: true
            }
            break;
        case authConstant.LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case authConstant.LOGOUT_SUCCESS:
            state = {
                ...initialState
            }
            break;
        case authConstant.LOGOUT_FAILURE:
            state = {
                ...state,
                loading: false,
                error:action.payload.error
            }
            break;
    }
    return state
}