import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import TodoComponent from './components/todo';



const App: React.FC = () => {
    return (
        <Router>
            <Routes>
              <Route path='/' element = {<TodoComponent/>} />
            </Routes>
        </Router>
    );
};

export default App;
