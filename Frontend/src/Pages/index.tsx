import Register from './register'
import Main from './main'
import * as React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const App = () => {
  
  return(
    <Router>
        <Routes>
          <Route  path="/" element={<Register />} />
          <Route  path="main/:username" element={<Main />} />
        </Routes>
    </Router>
  );
  
}

export default App
