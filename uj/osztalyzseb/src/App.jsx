import './App.css'
import Login from './pages/Login'
import Registrer from './pages/Registrer'
import Panel from './pages/Panel'

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="Register" element={<Registrer />} />
          <Route path="main" element={<Panel />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
