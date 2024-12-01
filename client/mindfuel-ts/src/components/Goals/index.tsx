import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { addGoal, deleteGoal, fetchGoals, updateGoal } from '../../store/golasSlice';
import GoalChart from './chart';

const GoalsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { goals, loading, error } = useSelector((state: RootState) => state.goals);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalType, setNewGoalType] = useState('daily');

  // Get token from cookies
  const token = Cookies.get('token'); // Ensure that the token is stored in cookies after login

  useEffect(() => {
    if (token) {
      dispatch(fetchGoals());
    }
  }, [dispatch, token]);

  const handleAddGoal = () => {
    if (newGoalTitle) {
      dispatch(addGoal({ title: newGoalTitle, type: newGoalType }));
      setNewGoalTitle('');
    }
  };

  const handleUpdateGoal = (goalId: string, achieved: boolean) => {
    dispatch(updateGoal({ id: goalId, achieved }));
  };

  const handleDeleteGoal = (goalId: string) => {
    dispatch(deleteGoal(goalId));
  };

  return (
    <div>
      <h1>Goals Page</h1>
      {error && <div>{error}</div>}

      <div className="add-goal">
        <input
          type="text"
          value={newGoalTitle}
          onChange={(e) => setNewGoalTitle(e.target.value)}
          placeholder="Enter goal title"
        />
        <select
          value={newGoalType}
          onChange={(e) => setNewGoalType(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
        <button onClick={handleAddGoal}><FaPlus /> Add Goal</button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <GoalChart goals={goals!} />
          <div>
            <h2>Goals List</h2>
            {goals!.map((goal) => (
              <div key={goal.id}>
                <h3>{goal.title} ({goal.type})</h3>
                <button onClick={() => handleUpdateGoal(goal.id, !goal.achieved)}>
                  {goal.achieved ? 'Mark as Incomplete' : 'Mark as Completed'}
                </button>
                <button onClick={() => handleDeleteGoal(goal.id)}>Delete</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GoalsPage;
