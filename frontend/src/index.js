import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store/store.js';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
    </React.StrictMode>
);

reportWebVitals();
