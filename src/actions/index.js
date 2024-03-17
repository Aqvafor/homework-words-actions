// Actions Types
export const ADD_WORD = 'ADD_WORD';
export const REMOVE_WORD = 'REMOVE_WORD';
export const UPDATE_WORD = 'UPDATE_WORD';

// Action Creators
export const addWord = word => ({ type: ADD_WORD, payload: word });
export const removeWord = word => ({ type: REMOVE_WORD, payload: word });
export const updateWord = (oldWord, newWord) => ({
  type: UPDATE_WORD,
  payload: { oldWord, newWord }
});
