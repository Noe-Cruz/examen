import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/login';
import Home from './pages/home';
import Register from './pages/register';
import RecoverPassword from './pages/recoverPassword';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='home' element={<Home/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='recoverpassword' element={<RecoverPassword/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
