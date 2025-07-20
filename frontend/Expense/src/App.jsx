
import Sidebar from './pages/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

const CLIENT_ID = import.meta.env.CLIENT_ID ;
const App = () => {
  return (
    <Router>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <ToastContainer/>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* All protected pages go inside Sidebar */}
          <Route path="/*" element={<Sidebar />} />
        </Routes>
      </GoogleOAuthProvider>
    </Router>

    
  )
}

export default App;