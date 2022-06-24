import Signup from './components/Signup';
import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';

function App() {
  return (
    <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
    </Routes>
    );
}

export default App;
