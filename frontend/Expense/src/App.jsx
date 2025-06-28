import React from 'react'
import Sidebar from './pages/Sidebar';
import {BrowserRouter as Router,Routes} from 'react-router-dom';


const App = () => {
  return (
    <Router>
      <Sidebar />
    </Router>

    
  )
}

export default App;