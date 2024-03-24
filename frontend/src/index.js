import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store/store.js';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

reportWebVitals();
