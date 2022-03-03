import * as actionTypes from './actions';

const initialState = {
    user: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
    },
    loginSuccess: null,
    loginError: null,
    registerSuccess: null,
    registerError: null,
    changePasswordSuccess: null,
    changePasswordError: null,
};

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.LOGIN_USER_REQUEST:
            state = {
                ...state,
                loginSuccess: false,
                loginError: false,
            };
            break;
        case actionTypes.LOGIN_USER_SUCCESS:
            state = {
                ...state,
                user: action.payload.data,
                loginSuccess: true,
                loginError: false,
            };
            localStorage.setItem('access_token', action.payload.data.token);
            break;
        case actionTypes.LOGIN_USER_ERROR:
            state = {
                ...state,
                loginSuccess: false,
                loginError: true,
            };
            break;
        case actionTypes.LOGOUT_USER_SUCCESS:
            localStorage.removeItem('access_token');
            break;
        case actionTypes.REGISTER_REQUEST:
            state = {
                ...state,
                loginSuccess: false,
                loginError: false,
            };
            break;
        case actionTypes.REGISTER_SUCCESS:
            state = {
                ...state,
                registerSuccess: true,
                registerError: false,
            };
            break;
        case actionTypes.REGISTER_ERROR:
            state = {
                ...state,
                registerSuccess: false,
                registerError: true,
            };
            break;
        case actionTypes.CHANGE_PASSWORD_REQUEST:
            state = {
                ...state,
                changePasswordSuccess: false,
                changePasswordError: false,
            };
            break;
        case actionTypes.CHANGE_PASSWORD_SUCCESS:
            state = {
                ...state,
                changePasswordSuccess: true,
                changePasswordError: false,
            };
            break;
        case actionTypes.CHANGE_PASSWORD_ERROR:
            state = {
                ...state,
                changePasswordSuccess: false,
                changePasswordError: true,
            };
            break;
    }

    return state;
}
