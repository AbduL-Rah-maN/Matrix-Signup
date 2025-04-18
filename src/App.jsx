import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignUpPage from './SignUp'; 
import LoginPage from './Login';
import NotFound from './NotFound';
import MatrixDashboard from './Dashboard';



function HomePage() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="matrix-container">
        <div className="bg-shade">
          <h1 className="intro-text">Welcome To Matrix</h1>  
          <h1 className="choose-text">CHOOSE YOUR PATH</h1>
          
          <div className="pill-grid">

            <Link to="/SignUp" className="matrix-pill red-pill">
              <span className="inline-block w-5 h-5 rounded-full bg-red-700 border border-black mr-2"></span>
              SIGN UP
            </Link>

            <Link to="/Login" className="matrix-pill blue-pill">
              <span className="inline-block w-5 h-5 rounded-full bg-blue-600 border border-black mr-2"></span>
              LOG IN
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
      <Route path="/Dashboard" element={<MatrixDashboard />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );

}

export default App
