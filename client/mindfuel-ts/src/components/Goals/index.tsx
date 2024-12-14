import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGoal, deleteGoal, fetchGoals, updateGoal } from '../../actions /goalsAction';
import { AppDispatch, RootState } from '../../store';
import GoalBarGraph from './GoalsBarGraph';

const GoalsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { goals, loading, error } = useSelector((state: RootState) => state.goals);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalType, setNewGoalType] = useState('daily');
  const [goalRating, setGoalRating] = useState<number>(3);

  const token = Cookies.get('token');

  useEffect(() => {
    if (token) {
      dispatch(fetchGoals());
    }
  }, [dispatch, token]);

  const handleAddGoal = () => {
    if (newGoalTitle) {
      dispatch(addGoal({ title: newGoalTitle, type: newGoalType, rating: goalRating }));
      setNewGoalTitle('');
      setGoalRating(3);
    }
  };

  const handleUpdateGoal = (goalId: string, achieved: boolean, rating: number) => {
    dispatch(updateGoal({ id: goalId, achieved, rating }));
  };
 
  

  const handleDeleteGoal = (goalId: string) => {
    dispatch(deleteGoal(goalId));
  };

  return (
    <div style={{ display: 'flex', padding: '20px', gap: '20px' }}>
      {/* Left Panel: Goal List */}
      <div style={{ flex: '1', borderRight: '1px solid #ddd', paddingRight: '20px' }}>
        <h2>Goals List</h2>
        {error && <div>{error}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {goals && goals.length > 0 ? (
              goals.map((goal) => (
                <li key={goal.id} style={{ marginBottom: '10px' }}>
                  <h4>{goal.title} ({goal.type})</h4>
                  <label>
                    Progress:{' '}
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={goal.rating || goalRating}
                      onChange={(e) =>
                        handleUpdateGoal(goal.id, goal.achieved, Number(e.target.value))
                      }
                    />
                  </label>
                  <div style={{ marginTop: '5px' }}>
                    <button
                      onClick={() =>
                        handleUpdateGoal(goal.id,goal.achieved, goal.rating || 3)
                      }
                    >
                      {
                        goal.rating < 5 ? 'incomplete' : 'complete' 
                      }
                    </button>
                    <button onClick={() => handleDeleteGoal(goal.id)}>Delete</button>
                  </div>
                </li>
              ))
            ) : (
              <div>No goals found</div>
            )}
          </ul>
        )}
      </div>

      {/* Center Panel: Bar Graph */}
      <div style={{ flex: '2' }}>
        <h2>Goals Progress</h2>
        <GoalBarGraph goals={goals || []} />
      </div>

      {/* Add New Goal */}
      <div style={{ flex: '1', paddingLeft: '20px', borderLeft: '1px solid #ddd' }}>
        <h2>Add New Goal</h2>
        <div>
          <input
            type="text"
            value={newGoalTitle}
            onChange={(e) => setNewGoalTitle(e.target.value)}
            placeholder="Enter goal title"
            style={{ marginBottom: '10px', width: '100%' }}
          />
        </div>
        <div>
          <select
            value={newGoalType}
            onChange={(e) => setNewGoalType(e.target.value)}
            style={{ marginBottom: '10px', width: '100%' }}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <div>
          <label>
            Progress (1-5):{' '}
            <input
              type="number"
              min="1"
              max="5"
              value={goalRating}
              onChange={(e) => setGoalRating(Number(e.target.value))}
              style={{ marginBottom: '10px', width: '100%' }}
            />
          </label>
        </div>
        <button onClick={handleAddGoal} style={{ width: '100%' }}>
          Add Goal
        </button>
      </div>
    </div>
  );
};

export default GoalsPage;
