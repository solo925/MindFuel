import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<any>(null); 
  const [isEditing, setIsEditing] = useState(false); 
  const [formData, setFormData] = useState({ name: '', email: '', profilePhoto: null as File | null });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/profile', {
          withCredentials: true, // Ensures cookies are sent with the request
        });
        setUser(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          profilePhoto: null,
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, profilePhoto: e.target.files[0] });
    }
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    const form = new FormData();
    form.append('name', formData.name);
    form.append('email', formData.email);
    if (formData.profilePhoto) {
      form.append('profilePhoto', formData.profilePhoto);
    }

    try {
      const response = await axios.put('http://localhost:3000/api/v1/profile', form, {
        withCredentials: true,
      });
      setUser(response.data);
      setIsEditing(false);
      setLoading(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete('http://localhost:3000/api/v1/profile', {
        withCredentials: true,
      });
      alert('Account deleted successfully');
      navigate('/login');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h1>User Profile</h1>
      {user && (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <img
              src={user.profilePhoto || 'https://via.placeholder.com/150'}
              alt="Profile"
              style={{ width: '150px', height: '150px', borderRadius: '50%' }}
            />
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>

          {isEditing ? (
            <div>
              <h3>Edit Profile</h3>
              <div style={{ marginBottom: '10px' }}>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={{
                    display: 'block',
                    margin: '10px auto',
                    padding: '8px',
                    width: '100%',
                  }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{
                    display: 'block',
                    margin: '10px auto',
                    padding: '8px',
                    width: '100%',
                  }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>Profile Photo:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'block', margin: '10px auto' }}
                />
                {formData.profilePhoto && (
                  <img
                    src={URL.createObjectURL(formData.profilePhoto)}
                    alt="Profile Preview"
                    style={{ width: '100px', height: '100px', borderRadius: '50%', marginTop: '10px' }}
                  />
                )}
              </div>
              <button onClick={handleUpdateProfile} disabled={loading} style={{ margin: '10px' }}>
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  padding: '10px',
                  border: 'none',
                  borderRadius: '5px',
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  backgroundColor: 'blue',
                  color: 'white',
                  padding: '10px',
                  margin: '10px',
                  border: 'none',
                  borderRadius: '5px',
                }}
              >
                <FaPen /> Edit Profile
              </button>
              <button
                onClick={handleDeleteAccount}
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  padding: '10px',
                  margin: '10px',
                  border: 'none',
                  borderRadius: '5px',
                }}
              >
                <FaTrashAlt /> Delete Account
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
