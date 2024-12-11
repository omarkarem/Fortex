import User from "../models/User.js";

// Get User Profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
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
      const userId = req.user.userId; 
      console.log("User ID from token:", userId);
  
      const user = await User.findById(userId);
      if (!user) {
        console.error("User not found for ID:", userId); 
        return res.status(404).json({ message: "User not found" });
      }
  
      // Update user details
      user.Email = req.body.Email || user.Email;
      user.PhoneNumber = req.body.PhoneNumber || user.PhoneNumber;
      await user.save();
  
      res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
      console.error("Error updating user profile:", error); 
      res.status(500).json({ message: "Failed to update profile", error });
    }
  };

  export const updateUserBookings = async (req, res) => {
    const { userId, propertyId, amount } = req.body; 
  
    try {
      // Find the user and update their bookings
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            bookings: {
              propertyId,
              amount,
              date: new Date(), 
            },
          },
        },
        { new: true } 
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update the property with the tenant ID
      const updatedProperty = await Property.findByIdAndUpdate(
        propertyId,
        { tenantId: userId },
        { new: true } 
      );
  
      if (!updatedProperty) {
        return res.status(404).json({ message: 'Property not found' });
      }
  
      res.status(200).json({
        message: 'Booking updated successfully',
        user: updatedUser,
        property: updatedProperty,
      });
    } catch (error) {
      console.error('Error updating booking and property:', error.message);
      res.status(500).json({ error: 'Failed to update booking and property' });
    }
  };


  export const getAuthenticatedUser = (req, res) => {
    // req.user comes from the token payload
    const { userId, email, type } = req.user; 
    
    res.json({ userId, email, type });
  };
  