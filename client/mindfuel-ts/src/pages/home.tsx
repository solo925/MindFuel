import React from "react";
import HabitCard from "../components/home/HabitCard";
import Header from "../components/home/Header";
import Sidebar from "../components/home/SideBar";

const HomePage: React.FC = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-5">
        {/* Header */}
        <Header />

        {/* Your Habits Section */}
        <section className="mt-8">
          <h2 className="mb-3 text-2xl font-bold">Your Habits</h2>
          <p className="mb-6 text-gray-600">
            Track and improve your daily habits.
          </p>

          {/* Habit Cards */}
          <div className="grid grid-cols-2 gap-6">
            <HabitCard
              title="Stretch"
              description="Improve flexibility with daily stretches."
              image="https://via.placeholder.com/100x100"
              progress="80%"
            />
            <HabitCard
              title="No Coffee"
              description="Stay caffeine-free for better sleep."
              image="https://via.placeholder.com/100x100"
              progress="100%"
            />
            <HabitCard
              title="No Snacking"
              description="Avoid snacks to maintain focus."
              image="https://via.placeholder.com/100x100"
              progress="60%"
            />
            <HabitCard
              title="Workout"
              description="Engage in 30 minutes of exercise."
              image="https://via.placeholder.com/100x100"
              progress="90%"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
