import { takeLatest, put } from 'redux-saga/effects';
import axios from '../../services/axios';
import {
    ADD_POST_ERROR,
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    DELETE_POST_ERROR, DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    GET_POSTS_ERROR,
    GET_POSTS_REQUEST,
    GET_POSTS_SUCCESS, UPDATE_POST_ERROR, UPDATE_POST_REQUEST, UPDATE_POST_SUCCESS,
} from './actions';

function* getPosts() {
    try {
        const response = yield axios.get(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/posts`,
        );
        if (response?.status === 200) {
            yield put({ type: GET_POSTS_SUCCESS, payload: response.data.posts });
        }
    } catch (error) {
        yield put({ type: GET_POSTS_ERROR, error });
    }
}

function* addPost(action) {
    try {
        const response = yield axios.post(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/posts`, {
                ...action.payload,
            },
        );
        if (response?.status === 200) {
            yield put({ type: ADD_POST_SUCCESS, payload: response.data.post });
        }
    } catch (error) {
        console.log(error, 'error');
        yield put({ type: ADD_POST_ERROR, error });
    }
}

function* deletePost(action) {
    try {
        const response = yield axios.delete(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/posts/${action.payload.id}`,
        );
        if (response?.status === 200) {
            yield put({ type: DELETE_POST_SUCCESS, payload: { id: action.payload.id } });
        }
    } catch (error) {
        yield put({ type: DELETE_POST_ERROR, error });
    }
}

function* updatePost(action) {
    try {
        const response = yield axios.put(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/posts/${action.payload._id}`, {
            ...action.payload,
            },
        );
        if (response?.status === 200) {
            yield put({ type: UPDATE_POST_SUCCESS, payload: { index: action.payload.index, post: action.payload } });
        }
    } catch (error) {
        yield put({ type: UPDATE_POST_ERROR, error });
    }
}

export default function* () {
    yield takeLatest(GET_POSTS_REQUEST, getPosts);
    yield takeLatest(ADD_POST_REQUEST, addPost);
    yield takeLatest(DELETE_POST_REQUEST, deletePost);
    yield takeLatest(UPDATE_POST_REQUEST, updatePost);
}
