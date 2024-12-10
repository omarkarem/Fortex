import Property from "../models/Property.js"

// fetching all properties
export const getProperties = async (req,res)=>{
    try {
        const properties = await Property.find();
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({message: "Error finding Properties",error});
    }
};


//fetching all properties for a user

export const getUserProperties = async (req,res)=>{
    try {
      const userId = req.user.userId; // Extract user ID from token
      const properties = await Property.find({ userId }); // Fetch only the user's properties
      res.status(200).json(properties);
  } catch (error) {
      console.error("Error fetching user properties:", error);
      res.status(500).json({ message: "Error fetching properties", error });
  }
};

// Add a new property
export const addProperty = async (req, res) => {
    const { location, bedrooms, bathrooms, price, type, size, image } = req.body;

    console.log("Received Data:", req.body); // Log incoming request body
    console.log("Authenticated User:", req.user); // Log user details from the token

    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const newProperty = new Property({
            location,
            bedrooms,
            bathrooms,
            price,
            type,
            size,
            image,
            userId: req.user.userId, // Make sure userId is valid and exists
        });

        await newProperty.save();
        res.status(201).json({ message: "Property added successfully", property: newProperty });
    } catch (error) {
        console.error("Error adding property:", error); // Log detailed error for debugging
        res.status(500).json({ message: "Error adding property", error });
    }
};
  

// Get total revenue from properties
export const getTotalRevenue = async (req, res) => {
  try {
    const userId = req.user.userId; // Extract user ID from token
    const properties = await Property.find({ userId }); // Get properties for the user
    const totalRevenue = properties.reduce((sum, property) => sum + property.price, 0);
    res.status(200).json({ totalRevenue });
  } catch (error) {
    console.error("Error fetching total revenue:", error);
    res.status(500).json({ message: "Failed to fetch total revenue", error });
  }
};

  
// Get the property count
export const getPropertyCount = async (req, res) => {
  try {
    const userId = req.user.userId; // Extract user ID from token
    const propertyCount = await Property.countDocuments({ userId }); // Count properties
    res.status(200).json({ propertyCount });
  } catch (error) {
    console.error("Error fetching property count:", error);
    res.status(500).json({ message: "Failed to fetch property count", error });
  }
};



// Update property
export const updateProperty = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
  
    try {
      const property = await Property.findById(id);
  
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
  
      if (property.userId.toString() !== req.user.userId) {
        return res.status(403).json({ message: "Unauthorized to edit this property" });
      }
  
      const updatedProperty = await Property.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true, // Ensure validation rules are applied
      });
  
      res.status(200).json({ message: "Property updated successfully", property: updatedProperty });
    } catch (error) {
      res.status(500).json({ message: "Failed to update property", error });
    }
  };

  export const deleteProperty = async (req, res) => {
    const { id } = req.params;
  
    try {
      const property = await Property.findById(id);
  
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
  
      if (property.userId.toString() !== req.user.userId) {
        return res.status(403).json({ message: "Unauthorized to delete this property" });
      }
  
      await property.deleteOne({_id:id});
      res.status(200).json({ message: "Property removed successfully" });
    } catch (error) {
      console.error("Error deleting property:", error); // Log error for debugging
      res.status(500).json({ message: "Failed to remove property", error });
    }
  };
  

// Get a single property by ID
export const getPropertyById = async (req, res) => {
  const { id } = req.params;
  try {
      const property = await Property.findById(id);
      if (!property) {
          return res.status(404).json({ message: "Property not found" });
      }
      res.status(200).json(property);
  } catch (error) {
      console.error("Error fetching property:", error);
      res.status(500).json({ message: "Failed to fetch property", error });
  }
};

// Fetch recommendations based on price
export const getRecommendations = async (req, res) => {
  try {
      const { price } = req.query;
      if (!price) {
          return res.status(400).json({ message: "Price is required" });
      }

      // Find 4 properties within a similar price range (+/- 20%)
      const minPrice = price * 0.8;
      const maxPrice = price * 1.2;

      const recommendations = await Property.find({
          price: { $gte: minPrice, $lte: maxPrice },
      }).limit(4);

      res.status(200).json(recommendations);
  } catch (error) {
      console.error("Error fetching recommendations:", error);
      res.status(500).json({ message: "Error fetching recommendations" });
  }
};
