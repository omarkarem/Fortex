import User from "../models/User.js";

// Get User Profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId); // Retrieve user ID from token
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile", error });
  }
};

// Update Email
export const updateEmail = async (req, res) => {
  const { Email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { Email },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Email updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating email", error });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.deleteOne();
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting account", error });
  }
};


// Update user profile
export const updateUserProfile = async (req, res) => {
    try {
      const userId = req.user.userId; // Ensure req.user.userId is correct
      console.log("User ID from token:", userId);
  
      const user = await User.findById(userId);
      if (!user) {
        console.error("User not found for ID:", userId); // Debugging
        return res.status(404).json({ message: "User not found" });
      }
  
      // Update user details
      user.Email = req.body.Email || user.Email;
      user.PhoneNumber = req.body.PhoneNumber || user.PhoneNumber;
      await user.save();
  
      res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
      console.error("Error updating user profile:", error); // Debugging
      res.status(500).json({ message: "Failed to update profile", error });
    }
  };
  