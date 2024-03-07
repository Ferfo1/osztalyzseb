import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import '@fontsource/roboto/400.css';
import './App.css';
import Footer from './components/Footer';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './components/Logout';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;