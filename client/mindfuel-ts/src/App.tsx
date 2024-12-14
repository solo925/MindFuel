import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginComponent from './components/Auth/Login';
import ProfilePage from './components/Auth/Profile';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import RegisterComponent from './components/Auth/register';
import GoalsPage from './components/Goals';
import HabitsComponent from './components/habits';
import HomePage from './components/home/home';
// import Notifications from './components/notifications/notification';


const App: React.FC = () => {
    return (
    <Router>
        <Routes>
                <Route path="/register" element={<RegisterComponent />} />  
                <Route path="/goals" element={<GoalsPage/>} />  
                {/* <Route path="/notifications" element={<Notifications/>} />   */}
                <Route path="/profile" element={<ProfilePage />} />  
                <Route path='/login' element={<LoginComponent />} />
                <Route path='/habits' element={<HabitsComponent />} />
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
