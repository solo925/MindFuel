import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import Cookies from 'js-cookie';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, List, ListItem, Typography, Box } from '@mui/material';
import { addNotification, fetchNotifications } from '../../actions /notificatioAction';
import { createHabit, fetchHabits } from '../../actions /habitAction';

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
    <Box sx={{ display: 'flex', gap: 3, padding: 2, backgroundColor: '#f8f9fc' }}>
      {/* Left Panel: Habit List */}
      <Box sx={{ flex: 1, borderRight: '1px solid #ddd', pr: 3 }}>
        <Typography variant="h6" color="primary">Your Habits</Typography>
        {error && <Typography color="error">Error: {error}</Typography>}
        {habits.length > 0 ? (
          <List>
            {habits.map((habit) => (
              <ListItem key={habit.id} sx={{ backgroundColor: '#e6f2ff', p: 2, borderRadius: '5px', mb: 1 }}>
                <strong>{habit.name}</strong> - {habit.description} ({habit.frequency} {habit.unit})
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No habits found.</Typography>
        )}
      </Box>

      {/* Middle Panel: Notifications */}
      <Box sx={{ flex: 1, borderRight: '1px solid #ddd', pr: 3 }}>
        <Typography variant="h6" color="primary">Notifications</Typography>
        {notifications.length > 0 ? (
          <List>
            {notifications.map((notification) => (
              <ListItem
                key={notification.id}
                sx={{
                  backgroundColor: '#cce5ff',
                  p: 2,
                  borderRadius: '5px',
                  mb: 1,
                  color: notification.read ? 'green' : 'orange',
                }}
              >
                {notification.message} - {notification.read ? 'Read' : 'Unread'}
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No notifications yet.</Typography>
        )}
      </Box>

      {/* Right Panel: Add Habit Form */}
      <Box sx={{ flex: 1, pl: 3 }}>
        <Typography variant="h6" color="primary">Add New Habit</Typography>
        <form onSubmit={handleAddHabit}>
          <TextField
            label="Habit Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Habit Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
          <TextField
            label="Frequency"
            type="number"
            value={frequency}
            onChange={(e) => setFrequency(Number(e.target.value))}
            fullWidth
            required
            margin="normal"
            inputProps={{ min: 1 }}
          />
          <FormControl fullWidth required margin="normal">
            <InputLabel>Unit</InputLabel>
            <Select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              label="Unit"
            >
              {unitOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? 'Adding...' : 'Add Habit'}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default HabitsComponent;
