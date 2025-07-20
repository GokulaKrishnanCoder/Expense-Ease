
import Sidebar from './pages/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = import.meta.env.VITE_CLIENT_ID ;
const App = () => {
  return (
    <Router>
      <GoogleOAuthProvider clientId={clientId}>
        <ToastContainer/>
      <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
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