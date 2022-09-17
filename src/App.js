import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import AddEdit from './pages/addItem';
import ViewItem from './pages/viewItem';
import './App.css';

function App() {
  return (
    <Routes>
        <Route exact path="/" element={<Home />} />  
        <Route exact path="/add/item" element={<AddEdit />} />  
        <Route exact path="/update/:id" element={<AddEdit />} />  
        <Route exact path="/view/:id" element={<ViewItem />} />  
    </Routes>
  );
}

export default App;