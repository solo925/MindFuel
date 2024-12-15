import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FiPlusCircle, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { addGoal, deleteGoal, fetchGoals, updateGoal } from "../../actions /goalsAction";
import { AppDispatch, RootState } from "../../store";
import GoalBarGraph from "./GoalsBarGraph";

const GoalsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { goals, loading, error } = useSelector((state: RootState) => state.goals);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalType, setNewGoalType] = useState("daily");
  const [goalRating, setGoalRating] = useState<number>(3);
  const [showAddModal, setShowAddModal] = useState(false);

  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      dispatch(fetchGoals());
    }
  }, [dispatch, token]);

  const handleAddGoal = () => {
    if (newGoalTitle) {
      dispatch(addGoal({ title: newGoalTitle, type: newGoalType, rating: goalRating }));
      setNewGoalTitle("");
      setGoalRating(3);
      setShowAddModal(false);
    }
  };

  const handleUpdateGoal = (goalId: string, achieved: boolean, rating: number) => {
    dispatch(updateGoal({ id: goalId, achieved, rating }));
  };

  const handleDeleteGoal = (goalId: string) => {
    dispatch(deleteGoal(goalId));
  };

  return (
    <div className="flex flex-row gap-4 p-6 min-h-screen bg-gray-50">
      {/* Left Panel: Goals List */}
      <div className="p-4 w-1/3 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-blue-600">My Goals</h2>
        {error && <div className="text-red-500">{error}</div>}
        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : goals && goals.length > 0 ? (
          <ul className="space-y-4">
            {goals.map((goal) => (
              <li
                key={goal.id}
                className="flex justify-between items-center p-3 bg-gray-100 rounded-lg"
              >
                <div>
                  <h4 className="font-semibold text-blue-700">{goal.title}</h4>
                  <p className="text-sm text-gray-600">Type: {goal.type}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={goal.rating || goalRating}
                    onChange={(e) =>
                      handleUpdateGoal(goal.id, goal.achieved, Number(e.target.value))
                    }
                    className="px-2 w-16 rounded border border-gray-300"
                  />
                  <button onClick={() => handleDeleteGoal(goal.id)} className="text-red-500">
                    <FiTrash2 />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No goals found</p>
        )}
      </div>

      {/* Center Panel: Graph */}
      <div className="flex flex-col justify-center items-center p-4 w-2/3 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-blue-600">Goals Progress</h2>
        <GoalBarGraph goals={goals || []} />
      </div>

      {/* Right Panel: Add Goal */}
      <div className="flex flex-col items-center w-1/3">
        <button
          onClick={() => setShowAddModal(true)}
          className="text-blue-600 transition-all duration-200 hover:text-blue-800"
        >
          <FiPlusCircle size={50} />
        </button>
        <p className="mt-2 text-blue-600">Add Goal</p>

        {/* Add Goal Modal */}
        {showAddModal && (
          <div className="flex fixed inset-0 justify-center items-center bg-black bg-opacity-30">
            <div className="p-6 w-80 bg-white rounded-lg shadow-lg">
              <h3 className="mb-4 text-lg font-semibold text-blue-600">Add New Goal</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Goal Title"
                  value={newGoalTitle}
                  onChange={(e) => setNewGoalTitle(e.target.value)}
                  className="px-3 py-2 w-full rounded border border-gray-300"
                />
                <select
                  value={newGoalType}
                  onChange={(e) => setNewGoalType(e.target.value)}
                  className="px-3 py-2 w-full rounded border border-gray-300"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={goalRating}
                  onChange={(e) => setGoalRating(Number(e.target.value))}
                  className="px-3 py-2 w-full rounded border border-gray-300"
                />
                <button
                  onClick={handleAddGoal}
                  className="py-2 w-full text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Add Goal
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="mt-2 w-full text-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalsPage;
 