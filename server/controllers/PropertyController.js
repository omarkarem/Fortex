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



export const getUserProperties = async (req,res)=>{
    try {
      const userId = req.user.userId;
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

    console.log("Received Data:", req.body); 
    console.log("Authenticated User:", req.user); 

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
            userId: req.user.userId, 
        });

        await newProperty.save();
        res.status(201).json({ message: "Property added successfully", property: newProperty });
    } catch (error) {
        console.error("Error adding property:", error); 
        res.status(500).json({ message: "Error adding property", error });
    }
};
  

// Get total revenue from properties
export const getTotalRevenue = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const properties = await Property.find({ userId }); 
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
    const userId = req.user.userId; 
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

        // Validate the price parameter
        if (!price) {
            return res.status(400).json({ message: "Price query parameter is required" });
        }

        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice)) {
            return res.status(400).json({ message: "Invalid price value" });
        }

        // Calculate price range for recommendations (±20% of given price)
        const minPrice = parsedPrice * 0.5;
        const maxPrice = parsedPrice * 1.5;

        // Fetch properties within the price range 
        const recommendations = await Property.find({
            price: { $gte: minPrice, $lte: maxPrice },
        }).limit(4);

        res.status(200).json(recommendations);
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        res.status(500).json({ message: "Error fetching recommendations", error });
    }
};


// Searches properties by location
export const searchProperties = async (req, res) => {
  try {
    const { location } = req.query;
    if (!location) {
      return res.status(400).json({ error: "Location query parameter is required." });
    }

    // Using case-insensitive partial match with regex
    const properties = await Property.find({
      location: { $regex: location, $options: "i" }
    });

    res.json(properties);
  } catch (error) {
    console.error("Error searching properties by location:", error);
    res.status(500).json({ error: "Failed to search properties by location" });
  }
};


export const getOwnerPropertiesWithTenants = async (req, res) => {
  try {
    const userId = req.user.userId; // The owner’s user ID from the token
    // Find properties where userId matches the owner, and populate tenant details
    const properties = await Property.find({ userId })
      .populate('tenantId', 'FirstName LastName');

    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching owner properties with tenants:", error);
    res.status(500).json({ message: "Error fetching owner properties", error });
  }
};