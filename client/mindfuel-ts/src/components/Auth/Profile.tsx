import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profilePhoto: null as File | null,
  });
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false); // For delete confirmation dialog
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/profile", {
          withCredentials: true,
        });
        setUser(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          profilePhoto: null,
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
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
    form.append("name", formData.name);
    form.append("email", formData.email);
    if (formData.profilePhoto) {
      form.append("profilePhoto", formData.profilePhoto);
    }

    try {
      const response = await axios.put("http://localhost:3000/api/v1/profile", form, {
        withCredentials: true,
      });
      setUser(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete("http://localhost:3000/api/v1/profile", {
        withCredentials: true,
      });
      alert("Account deleted successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 600, margin: "auto" }}>
      <Typography variant="h4" align="center" gutterBottom>
        User Profile
      </Typography>
      {user ? (
        <Card>
          <CardContent>
            {/* User Info */}
            <Grid container spacing={3} justifyContent="center">
              <Grid item>
                <Avatar
                  src={user.profilePhoto || "https://via.placeholder.com/150"}
                  alt="Profile"
                  sx={{ width: 150, height: 150 }}
                />
              </Grid>
              <Grid item>
                <Typography variant="h6">{user.name}</Typography>
                <Typography color="textSecondary">{user.email}</Typography>
              </Grid>
            </Grid>

            {/* Edit Mode */}
            {isEditing ? (
              <Box mt={3}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <Button
                  variant="contained"
                  component="label"
                  sx={{ mt: 2 }}
                  fullWidth
                >
                  Upload Profile Photo
                  <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                </Button>
                {formData.profilePhoto && (
                  <Box mt={2} textAlign="center">
                    <img
                      src={URL.createObjectURL(formData.profilePhoto)}
                      alt="Profile Preview"
                      style={{ width: 100, height: 100, borderRadius: "50%" }}
                    />
                  </Box>
                )}
                <Box mt={3} display="flex" gap={2} justifyContent="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateProfile}
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} /> : "Update Profile"}
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box mt={3} display="flex" gap={2} justifyContent="center">
                <Button
                  variant="outlined"
                  startIcon={<FaPen />}
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<FaTrashAlt />}
                  onClick={() => setOpenDialog(true)}
                >
                  Delete Account
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      ) : (
        <Typography align="center">Loading user profile...</Typography>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="delete-confirmation-dialog"
      >
        <DialogTitle id="delete-confirmation-dialog">
          Confirm Account Deletion
        </DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete your account?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteAccount} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserProfile;
