import React from 'react';
import Nav from './Nav';
import Body from './Body';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from '../pages/search';

const App = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
};

export default App;
