import { all } from 'redux-saga/effects';
// import currentCitySaga from './currentCity/saga';
import authSaga from './auth/saga';
import postSaga from './post/saga';
// import profileSaga from './profile/saga';

export default function* rootSaga() {
    yield all([
        // currentCitySaga(),
        authSaga(),
        postSaga(),
        // profileSaga(),
    ]);
}
