import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProfilePage from "../components//Auth/Profile";
import LoginComponent from "../components/Auth/Login";
import ProtectedRoute from "../components/Auth/ProtectedRoute";
import RegisterComponent from "../components/Auth/register";
import GoalsPage from "../components/Goals";
import HabitsComponent from "../components/habits";
import NotFound from "../layout/NotFound";
import HomePage from "../pages/home";

const RouterComponent = () => {
    return (
        <Router>
        <Routes>
                <Route path="/register" element={<RegisterComponent />} />  
                <Route
                    path="/goals"
                    element={
                        <ProtectedRoute>
                            <GoalsPage />
                        </ProtectedRoute>} />  
                {/* <Route path="/notifications" element={<Notifications/>} />   */}
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>} />  
                <Route path='/login' element={<LoginComponent />} />
                <Route
                    path='/habits'
                    element={
                        <ProtectedRoute>
                            <HabitsComponent />
                        </ProtectedRoute>
                    }
                         />
                <Route
                    path='/'
            
                    element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={ <NotFound/> } />
                       
        </Routes>
        </Router>
    )
}

export default RouterComponent;