import { Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './Pages/Auth';
import Welcome from './Pages/Welcome';
import Sent from './components/Sent';
import EmailList from './components/EmailList';
import Folders from './components/Folders';
import { useSelector } from 'react-redux';

const App = () => {
  const isLogin = useSelector((state)=>state.auth.isAuthenticated);
  return (
    <Routes>
      <Route path='/' element={<AuthForm />} />
      {isLogin && <Route path='/mails/*' element={<Welcome />}>
        <Route path='inbox' element={<EmailList />} />
        <Route path='sent' element={<Sent />} />
        <Route path='starred' element={<Folders />} />
        <Route path='important' element={<Folders />} />
        <Route path='drafts' element={<Folders />} />
      </Route>}
      <Route path="*" element={<Navigate to="/" />}/>
      </Routes>
  );
}

export default App;