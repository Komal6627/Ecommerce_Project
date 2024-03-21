import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // Assuming rootReducer is default-exported

const store = configureStore({
    reducer: rootReducer,
});

export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();

export default store;
