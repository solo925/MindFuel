import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginComponent from './components/Auth/Login';
import ProfilePage from './components/Auth/Profile';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import RegisterComponent from './components/Auth/register';
import GoalsPage from './components/Goals';
import HomePage from './components/home/home';


const App: React.FC = () => {
    return (
    <Router>
        <Routes>
                <Route path="/register" element={<RegisterComponent />} />  
                <Route path="/goals" element={<GoalsPage/>} />  
                <Route path="/profile" element={<ProfilePage />} />  
                <Route path='/login' element={<LoginComponent />} />
                <Route
                    path='/'
            
                    element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />
                       
        </Routes>
        </Router>
    );
};

export default App;
