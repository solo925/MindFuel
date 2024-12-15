import React from "react";
import { FaCar, FaCog, FaMoon, FaShoppingCart, FaTint, FaUtensils } from "react-icons/fa";

const Sidebar: React.FC = () => {
  return (
    <div className="h-screen w-60 bg-gray-50 border-r border-gray-200 p-5">
      <h1 className="text-2xl font-bold mb-8 flex items-center">
        <span className="text-indigo-600 mr-2">🧠</span> MindFuel
      </h1>
      <ul className="space-y-5 text-gray-700">
        <li className="flex items-center font-semibold text-indigo-600">
          <FaShoppingCart className="mr-3" /> Home
        </li>
        <li className="flex items-center">
          <FaUtensils className="mr-3" /> Meals
        </li>
        <li className="flex items-center">
          <FaTint className="mr-3" /> Water
        </li>
        <li className="flex items-center">
          <FaMoon className="mr-3" /> Sleep
        </li>
        <li className="flex items-center">
          <FaCar className="mr-3" /> Customize
        </li>
        <li className="flex items-center">
          <FaCog className="mr-3" /> Settings
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
