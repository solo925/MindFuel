import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import GuestRoute from './components/Auth/guest';
import RegisterComponent from './components/Auth/register';


const App: React.FC = () => {
    return (
        <Router>
            <Routes>
    
          <Route path="/register" element={<RegisterComponent />} />
          <Route element={<GuestRoute />}>
    <Route path="/register" element={<RegisterComponent />} />
</Route>

               
            </Routes>
        </Router>
    );
};

export default App;
