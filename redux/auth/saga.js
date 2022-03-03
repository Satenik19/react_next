import { takeLatest, put } from 'redux-saga/effects';
import axios from '../../services/axios';
import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_ERROR, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_ERROR, CHANGE_PASSWORD_REQUEST,
} from './actions';

function* signIn(action) {
    console.log(process.env.NEXT_PUBLIC_API_ENDPOINT, 'api url');
    try {
        const response = yield axios.post(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/login`, {
                ...action.payload,
            },
        );
        if (response?.status === 200) {
            yield put({
                type: LOGIN_USER_SUCCESS,
                payload: {
                    data: response.data,
                },
            });
        }
    } catch (error) {
        console.log(error, 'err');
        yield put({ type: LOGIN_USER_ERROR, error });
    }
}

function* signUp(action) {
    try {
        const response = yield axios.post(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/register`, {
                ...action.payload.data,
            },
        );
        if (response?.status === 200) {
            yield put({ type: REGISTER_SUCCESS });
        }
    } catch (error) {
        yield put({ type: REGISTER_ERROR, error });
    }
}

function* changePassword(action) {
    try {
        const response = yield axios.post(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/change-password`, {
                password: action.payload.password,
            },
        );
        if (response?.status === 200) {
            yield put({ type: CHANGE_PASSWORD_SUCCESS });
        }
    } catch (error) {
        yield put({ type: CHANGE_PASSWORD_ERROR, error });
    }
}

export default function* () {
    yield takeLatest(LOGIN_USER_REQUEST, signIn);
    yield takeLatest(REGISTER_REQUEST, signUp);
    yield takeLatest(CHANGE_PASSWORD_REQUEST, changePassword);
}
