import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Profile from './pages/Profile.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import CreateSkill from './pages/CreateSkill.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import UserListPage from './pages/UserListPage.jsx';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          {/* 3. Wrap your protected page(s) in this new element */}

          <Route element={<ProtectedRoute />}> 
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-skill" element={<CreateSkill />} />
            
            {/* You can add more protected routes here later */}
          </Route>
          
          {/* Admin-Only Protected Routes */}
          <Route element={<AdminRoute />}> {/* <-- 3. Add AdminRoute wrapper */}
            <Route path="/admin/userlist" element={<UserListPage />} />
            {/* Add more admin routes here later, e.g., /admin/skilllist */}
          </Route>

        </Routes>
      </div>
    </>
  );
}

export default App;