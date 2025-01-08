import LandingPage from './components/Landing/LandingPage';
import './index.scss';
import './App.scss';
import SignUp from './components/Sign/SignUp'
import Login from './components/Sign/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
