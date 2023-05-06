import logo from './logo.svg';
import './App.css';
import { Register } from './Pages/Register';
import {Routes,Route} from "react-router-dom"
import { Login } from './Pages/Login';
import Home from "./Pages/Home"

function App() {
  return (
    <div className="App">
     
     <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/home' element={<Home/>} />
     </Routes>
     </div>
  );
}

export default App;
