import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import usePrevious from '../../services/usePrevious';
// import { showToast } from '../../services/toast';
import { LOGIN_USER_REQUEST } from '../../redux/auth/actions';
import useAuth from '../../services/useAuth';

function Login() {
    const dispatch = useDispatch();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const isAuthenticated = useAuth();

    const loginSuccess = useSelector((state) => state.userData.loginSuccess);
    const loginError = useSelector((state) => state.userData.loginError);

    const prevLoginSuccess = usePrevious(loginSuccess);

    // useEffect(() => {
    //     if (isAuthenticated) {
    //         router.push('/home');
    //     }
    // }, []);
    useEffect(() => {
        if (prevLoginSuccess === false && loginSuccess) {
            router.push('/home');
        }
    }, [loginSuccess]);

    useEffect(() => {
        if (loginError) {
            // showToast('error', 'Something went wrong');
        }
    }, [loginError]);

    const submitLogin = (e) => {
        e.preventDefault();
        dispatch({
            type: LOGIN_USER_REQUEST,
            payload: {
                email,
                password,
            },
        });
    };

    return (
      <div className="container auth-wrapper">
        <div className="auth-inner">
          <form>
            <h3>Sign In</h3>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block" onClick={(e) => submitLogin(e)}>Login</button>
            <p className="forgot-password text-right">
              <Link href="/register"> Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
}

export default Login;
