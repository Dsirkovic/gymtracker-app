import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {Login} from "./pages/Login"
import { Main } from './pages/Main'
import './App.css'

function App() {
  return (
    <>
    <div>
      <Router>
        <Routes>
          <Route path="/" element = {<Login />} />
          <Route path="/Main" element = {<Main />} />
        </Routes>
      </Router>
      
    </div>
    </>
  )
}

export default App
