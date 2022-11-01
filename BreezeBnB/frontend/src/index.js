import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css'
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {configureStore} from './store';
import csrfFetch from './store/csrf';
import * as sessionActions from './store/session';
import { ModalProvider } from './context/Modal';
import * as entitiesActions from './store/entities';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch
  window.sessionActions = sessionActions;
  window.entitiesActions = entitiesActions;
}

function Root() {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ModalProvider>
  );
}
const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

if (sessionStorage.getItem('X-CSRF-token') === null || 
    sessionStorage.getItem('currentUser' === null)) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication)
} else {
  renderApplication()
}