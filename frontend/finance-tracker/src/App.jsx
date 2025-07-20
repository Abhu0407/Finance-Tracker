import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import Home from './pages/dashboard/Home';
import Expense from './pages/dashboard/Expense';
import Income from './pages/dashboard/income';
import UserProvider from './context/userContext';
import { Toaster } from 'react-hot-toast';


const App = () => (
  <UserProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute><Home /></ProtectedRoute>}
        />
        <Route
          path="/"
          element={<ProtectedRoute><Home /></ProtectedRoute>}
        />
        <Route
          path="/income"
          element={<ProtectedRoute><Income /></ProtectedRoute>}
        />
        <Route
          path="/expense"
          element={<ProtectedRoute><Expense /></ProtectedRoute>}
        />
      </Routes>
    </Router>

    <Toaster 
      toastOptions={{
        className:"",
        style: {
          fontSize: '13px'
        },

      }}
    />
  </UserProvider>
);

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

export default App;