import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar /> {/* <-- 2. Add it here */}
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* We will add /profile route soon */}
        </Routes>
      </div>
    </>
  );
}

export default App;