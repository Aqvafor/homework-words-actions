
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { addWord, removeWord, updateWord } from './actions';
import './App.css';


const getUniqueLetters = words => {
  const letters = words
    .join('')
    .toLowerCase()
    .split('')
    .filter((value, index, self) => self.indexOf(value) === index);
  return letters.sort();
};
const Words = () => {
  const dispatch = useDispatch();
  const words = useSelector(state => state.words);
  const letters = getUniqueLetters(words);
  const [editingWord, setEditingWord] = useState(null);
  const [editedValue, setEditedValue] = useState('');
  const [newWord, setNewWord] = useState('');

  const handleAddWord = () => {
    if (newWord) { 
      dispatch(addWord(newWord));
      setNewWord(''); 
    }
  };

  const handleEdit = (word) => {
    setEditingWord(word);
    setEditedValue(word);
  };

  const handleSave = () => {
    dispatch(updateWord(editingWord, editedValue));
    setEditingWord(null); 
    setEditedValue(''); 
  };
  
  return (
    
    <div>
      
        <div>
        <input
          type="text"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          placeholder="Новое слово"
        />
        <button onClick={handleAddWord}>Добавить</button>
      </div>
      <div>
      <div>
        {letters.map(letter => (
          <Link key={letter} to={`/letter/${letter}`} style={{ padding: '5px' }}>
            {letter.toUpperCase()}
          </Link>
        ))}
      </div>
      {words.map(word => (
  <div key={word} className="word-container">
    {editingWord === word ? (
      <div>
        <input 
          type="text" 
          value={editedValue} 
          onChange={(e) => setEditedValue(e.target.value)} 
        />
        <button className="button" onClick={handleSave}>Сохранить</button>
        <button className="button" onClick={() => setEditingWord(null)}>Отмена</button>
      </div>
    ) : (
      <div>
        <Link to={`/word/${word}`}>{word}</Link>
        <button className="button" onClick={() => handleEdit(word)}>Изменить</button>
        <button className="button" onClick={() => dispatch(removeWord(word))}>Удалить</button>
      </div>
    )}
  </div>
))}
      </div>
    </div>
  );
};


const WordPage = () => {
  const { word } = useParams();
  const words = useSelector(state => state.words);
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      textAlign: 'center',
      fontSize: '2rem'
    }}>
      {word}
      <p>
        <Link to="/">На главную</Link>
      </p>
    </div>
  );
};


const LetterPage = () => {
  const { letter } = useParams();
  const words = useSelector(state => state.words); 
  const startsWith = words.filter(word => word.toLowerCase().startsWith(letter));
  const includes = words.filter(word => !word.toLowerCase().startsWith(letter) && word.toLowerCase().includes(letter));

  return (
    <div>
      <h2>Starts with "{letter.toUpperCase()}"</h2>
      {startsWith.map(word => <div key={word}>{word}</div>)}
      <h2>Includes "{letter.toUpperCase()}"</h2>
      {includes.map(word => <div key={word}>{word}</div>)}
      <p>
        <Link to="/">На главную</Link> 
      </p>
    </div>
  );
};


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Words />} />
        <Route path="/word/:word" element={<WordPage />} />
        <Route path="/letter/:letter" element={<LetterPage />} />
      </Routes>
    </Router>
  );
};

export default App;
