import LandingPage from './components/Landing/LandingPage';
import './index.scss';
import './App.scss';
import SignUp from './components/Sign/SignUp'
import Login from './components/Sign/Login'
import NotesApp from './components/Notes/NotesApp'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResetPassword from './components/Sign/ResetPassword'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path='/reset-password' element={<ResetPassword/>}></Route>
        <Route path='/dashboard' element={<NotesApp/>}></Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
    </Router>
  )
}

export default App
