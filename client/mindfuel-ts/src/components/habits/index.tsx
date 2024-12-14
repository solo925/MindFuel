import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createHabit, fetchHabits } from '../../actions /habitAction';
import { AppDispatch, RootState } from '../../store';
import { addNotification, fetchNotifications } from '../../store/notificationSlice';

const HabitsComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { habits, loading, error } = useSelector((state: RootState) => state.habits);
  const { notifications } = useSelector((state: RootState) => state.notifications);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState<number>(1);
  const [unit, setUnit] = useState<string>('daily');
  const [nextReminder, setNextReminder] = useState<string>('');

  // Fetch token and userId from cookies
  const token = Cookies.get('token');
  

  const unitOptions = [
    { value: 'minute', label: 'Every Minute' },
    { value: 'hourly', label: 'Hourly' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
  ];

  useEffect(() => {
    if (token) {
      dispatch(fetchNotifications());
      dispatch(fetchHabits());
    }
  }, [dispatch, token]);



  useEffect(() => {
    console.log('Habits:', habits);
  }, [habits]);
  
  const handleAddHabit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      alert('Please log in to create a habit.');
      return;
    }
  
    try {
      const newHabit = { name, description, frequency, unit };
      await dispatch(createHabit(newHabit));
      dispatch(fetchHabits())
      await dispatch(addNotification({ message: `New habit created: ${name}` }));
  
      // Reset form fields
      setName('');
      setDescription('');
      setFrequency(1);
      setUnit('daily');
      setNextReminder('');
    } catch (err) {
      console.error('Error creating habit:', err);
    }
  };
  
  return (
    <div>
      <h1>Build a Habit</h1>
      <form onSubmit={handleAddHabit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Habit Name"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Habit Description"
        />
        <input
          type="number"
          value={frequency}
          onChange={(e) => setFrequency(Number(e.target.value))}
          placeholder="Frequency"
          min="1"
          required
        />
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          required
        >
          {unitOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Habit'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <h2>Your Habits</h2>
      {habits.length > 0 ? (
        <ul>
          {habits.map((habit) => (
            <li key={habit.id}>
              <strong>{habit.name}</strong> - {habit.description} ({habit.frequency} {habit.unit})
            </li>
          ))}
        </ul>
      ) : (
        <p>No habits found.</p>
      )}

      <h2>Notifications</h2>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>
              {notification.message} - {notification.read ? 'Read' : 'Unread'}
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications yet.</p>
      )}
    </div>
  );
};

export default HabitsComponent;
