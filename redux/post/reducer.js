import * as actionTypes from './actions';

const initialState = {
    posts: [],
    addPostSuccess: null,
    addPostError: null,
    deletePostSuccess: null,
    deletePostError: null,
    updatePostSuccess: null,
    updatePostError: null,
};

export function postsReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_POSTS_REQUEST:
            state = {
                ...state,
            };
            break;
        case actionTypes.GET_POSTS_SUCCESS:
            state = {
                ...state,
                posts: [...action.payload],
            };
            break;
        case actionTypes.ADD_POST_REQUEST:
            state = {
                ...state,
                addPostSuccess: false,
                addPostError: false,
            };
            break;
        case actionTypes.ADD_POST_SUCCESS:
            state = {
                ...state,
                posts: [...state.posts, { ...action.payload }],
                addPostSuccess: true,
                addPostError: false,
            };
            break;
        case actionTypes.ADD_POST_ERROR:
            state = {
                ...state,
                addPostSuccess: false,
                addPostError: true,
            };
            break;
        case actionTypes.DELETE_POST_REQUEST:
            state = {
                ...state,
                deletePostSuccess: false,
                deletePostError: false,
            };
            break;
        case actionTypes.DELETE_POST_SUCCESS:
            state = {
                ...state,
                posts: [...state.posts.filter((post) => post._id !== action.payload.id)],
                deletePostSuccess: true,
                deletePostError: false,
            };
            break;
        case actionTypes.DELETE_POST_ERROR:
            state = {
                ...state,
                deletePostSuccess: false,
                deletePostError: true,
            };
            break;
        case actionTypes.UPDATE_POST_REQUEST:
            state = {
                ...state,
                updatePostSuccess: false,
                updatePostError: false,
            };
            break;
        case actionTypes.UPDATE_POST_SUCCESS:
        {
            const newData = [...state.posts];
            newData[action.payload.index] = { ...action.payload.post };
            state = {
                posts: [...newData],
                updatePostSuccess: true,
                updatePostError: false,
            };
            break;
        }
        case actionTypes.UPDATE_POST_ERROR:
            state = {
                ...state,
                updatePostSuccess: false,
                updatePostError: true,
            };
            break;
    }

    return state;
}
