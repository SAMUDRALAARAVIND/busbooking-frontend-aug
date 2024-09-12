import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../redux/CounterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});