import Navigation from './components/Navigation';
import './App.css';
import AuthForm from './components/Auth';
import HomePage from './components/Home';
import {Route, Routes, Navigate} from 'react-router-dom';
import {useSelector} from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div>
    <Navigation/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
        {!isLoggedIn && <Route path="/login" element={<AuthForm/>}/>}
        <Route path="*" element={<Navigate to="/" />}/>
      </Routes>
    </div>
  );
}

export default App;
