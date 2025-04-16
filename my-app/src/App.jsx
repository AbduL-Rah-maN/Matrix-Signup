import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignUpPage from './SignUp'; 
import LoginPage from './Login';


function HomePage() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="matrix-container">
        <div className="bg-shade">
          <h1 className="intro-text">Welcome To Matrix</h1>  
          <h1 className="choose-text">CHOOSE YOUR PATH</h1>
          
          <div className="pill-grid">

            <Link to="/SignUp" className="pill-column left-column">
              <button className="matrix-pill red-pill">
              <span className="inline-block w-5 h-5 rounded-full bg-red-700 border border-black"></span> SIGN UP
              </button>
            </Link>
            
            

            <Link to="/Login" className="pill-column right-column">
              <button className="matrix-pill blue-pill">
              <span className="inline-block w-5 h-5 rounded-full bg-blue-600 border border-black"></span> LOG IN
              </button>
            </Link>
          </div>
        </div> 
      </div>

    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/Login" element= {<LoginPage />} />
    </Routes>
  );

}

export default App
