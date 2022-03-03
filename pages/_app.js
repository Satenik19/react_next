import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// eslint-disable-next-line import/extensions
// import 'bootstrap/dist/js/bootstrap.js';
// import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/extensions,import/no-absolute-path,import/no-unresolved
import store from '/redux/store';
import { RouteGuard } from '../services/authCheck';

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
  // eslint-disable-next-line react/react-in-jsx-scope
  return (
    <Provider store={store}>
      <RouteGuard>
        <Component {...pageProps} />
      </RouteGuard>
    </Provider>
  );
}

export default MyApp;
