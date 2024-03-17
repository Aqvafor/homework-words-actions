import { ADD_WORD, REMOVE_WORD, UPDATE_WORD } from '../actions';
import React, { useState } from 'react';

const initialState = [
    'Apple', 'Banana', 'Cherry', 'Almond', 'Elderberry', 'Fig', 'Grape', 'Honeydew',
    'Iceberg', 'Jackfruit', 'Kiwi', 'Lemon', 'Mango', 'Nectarine', 'Orange',
    'Papaya', 'Quince', 'Raspberry', 'Strawberry', 'Tomato', 'Peanut',
    'Vanilla', 'Watermelon', 'Avocado', 'Cranberry', 'Gooseberry', 'Artichoke', 'Broccoli',
    'Carrot', 'Daikon'
];

export default function wordsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_WORD:
      return [...state, action.payload];
    case REMOVE_WORD:
      return state.filter(word => word !== action.payload);
    case UPDATE_WORD:
      return state.map(word => word === action.payload.oldWord ? action.payload.newWord : word);
    default:
      return state;
  };
};
