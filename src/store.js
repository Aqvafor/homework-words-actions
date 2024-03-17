import { createStore, combineReducers } from 'redux';
import wordsReducer from './reducers/wordsReducer';

const rootReducer = combineReducers({
  words: wordsReducer,
});

const store = createStore(rootReducer);

export default store;
