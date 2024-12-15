import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createHabit, fetchHabits } from '../../actions /habitAction';
import { addNotification, fetchNotifications } from '../../actions /notificatioAction';
import { AppDispatch, RootState } from '../../store';

const HabitsComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { habits, loading, error } = useSelector((state: RootState) => state.habits);
  const { notifications } = useSelector((state: RootState) => state.notifications);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState<number>(1);
  const [unit, setUnit] = useState<string>('daily');

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

  const handleAddHabit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      alert('Please log in to create a habit.');
      return;
    }

    try {
      const newHabit = { name, description, frequency, unit };
      await dispatch(createHabit(newHabit));
      dispatch(fetchHabits());
      await dispatch(addNotification({ message: `New habit created: ${name}` }));
      setName('');
      setDescription('');
      setFrequency(1);
      setUnit('daily');
    } catch (err) {
      console.error('Error creating habit:', err);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px', background: '#f8f9fc' }}>
      {/* Left Panel: Habit List */}
      <div style={{ flex: '1', borderRight: '1px solid #ddd', paddingRight: '20px' }}>
        <h2 style={{ color: '#0b6cbf' }}>Your Habits</h2>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {habits.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {habits.map((habit) => (
              <li
                key={habit.id}
                style={{
                  background: '#e6f2ff',
                  padding: '10px',
                  marginBottom: '10px',
                  borderRadius: '5px',
                }}
              >
                <strong>{habit.name}</strong> - {habit.description} (
                {habit.frequency} {habit.unit})
              </li>
            ))}
          </ul>
        ) : (
          <p>No habits found.</p>
        )}
      </div>

      {/* Middle Panel: Notifications */}
      <div style={{ flex: '1', borderRight: '1px solid #ddd', paddingRight: '20px' }}>
        <h2 style={{ color: '#0b6cbf' }}>Notifications</h2>
        {notifications.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {notifications.map((notification) => (
              <li
                key={notification.id}
                style={{
                  background: '#cce5ff',
                  padding: '10px',
                  marginBottom: '10px',
                  borderRadius: '5px',
                }}
              >
                {notification.message} -{' '}
                <span style={{ color: notification.read ? 'green' : 'orange' }}>
                  {notification.read ? 'Read' : 'Unread'}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No notifications yet.</p>
        )}
      </div>

      {/* Right Panel: Add Habit Form */}
      <div style={{ flex: '1', paddingLeft: '20px' }}>
        <h2 style={{ color: '#0b6cbf' }}>Add New Habit</h2>
        <form
          onSubmit={handleAddHabit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            background: '#e9f7ff',
            padding: '15px',
            borderRadius: '8px',
          }}
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Habit Name"
            required
            style={{
              padding: '8px',
              border: '1px solid #b3d8ff',
              borderRadius: '5px',
            }}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Habit Description"
            style={{
              padding: '8px',
              border: '1px solid #b3d8ff',
              borderRadius: '5px',
            }}
          />
          <input
            type="number"
            value={frequency}
            onChange={(e) => setFrequency(Number(e.target.value))}
            placeholder="Frequency"
            min="1"
            required
            style={{
              padding: '8px',
              border: '1px solid #b3d8ff',
              borderRadius: '5px',
            }}
          />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            required
            style={{
              padding: '8px',
              border: '1px solid #b3d8ff',
              borderRadius: '5px',
            }}
          >
            {unitOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: '#0b6cbf',
              color: '#fff',
              padding: '10px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {loading ? 'Adding...' : 'Add Habit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HabitsComponent;
