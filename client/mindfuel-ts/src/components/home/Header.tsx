import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";


const Header: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.login);
  const navigate = useNavigate()
  
  function handlenavigatetoProfile(e: { preventDefault: () => void; }) {
    e.preventDefault();
    navigate('/profile');
    
  }

  return (
    <div className="flex justify-between items-center p-5">
      <div>
        <h1 className="text-2xl font-bold">Good Morning, { user?.name || "Guest"}!</h1>
        <p className="text-gray-600">
          Here's a quick look at your health data and habits.
        </p>
      </div>
      <div className="flex space-x-3">
        <button className="px-4 py-2 text-indigo-600 rounded border hover:bg-gray-100" onClick={handlenavigatetoProfile}>
          Profile
        </button>
        <button className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-500">
          Help
        </button>
      </div>
    </div>
  );
};

export default Header;
