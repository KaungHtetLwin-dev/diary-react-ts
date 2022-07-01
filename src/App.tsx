import React from 'react';
import logo from './logo.svg';
import './App.css';
import './screens/HomeScreen';
import HomeScreen from './screens/HomeScreen';
import AddRecordScreen from './screens/AddRecordScreen';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import ViewRecordScreen from './screens/ViewRecordScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/add-record" element={<AddRecordScreen />} />
        <Route path="/view-record/:id" element={<ViewRecordScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
