import Signup from './componant/Signup';
import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";
import Login from './componant/Login';

function App() {
  return (
    <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/login' element={<Login />} />
    </Routes>
    );
}

export default App;
