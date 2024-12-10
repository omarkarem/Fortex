import React,{useState,useEffect} from "react";

const DashListings = ()=>{

    const [properties,setProperties]=useState([]);
    const [edit,setEdit]=useState(false);
    const [selectedProperty,setSelectedProperty]=useState(null);
    const [dropdown, setDropdown] = useState(null);
    const [addModal, setAddModal] = useState(false); // For Add Property modal
    const [newProperty, setNewProperty] = useState({
        location: "",
        bedrooms: "",
        bathrooms: "",
        price: "",
        type: "",
        size: "",
    });

    const toggleDropdown = (index) => {
        setDropdown((prevIndex) => (prevIndex === index ? null : index));
      };

    useEffect(()=>{
        const fetchProperties = async ()=>{
            try {
                const response = await fetch("https://fortexserver.vercel.app/properties",{
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("token")}`, 
                    },
                });
                const data = await response.json();
                setProperties(data);
            } catch (error) {
                console.error("error fetching properties:",error);
            }
        };
        fetchProperties();
    },[]);


    const handleAddProperty = async (e) => {
        e.preventDefault();
        console.log("Adding property with data:", newProperty); // Log the payload being sent
    
        try {
            const response = await fetch("https://fortexserver.vercel.app/properties", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(newProperty),
            });
    
            if (response.ok) {
                const addedProperty = await response.json();
                setProperties((prev) => [...prev, addedProperty.property]); // Add new property to list
                setAddModal(false); // Close modal
                alert("Property added successfully!");
            } else {
                const errorData = await response.json();
                console.error("Backend error:", errorData); // Log backend error response
                alert("Failed to add property");
            }
        } catch (error) {
            console.error("Error adding property:", error); // Log general errors
        }
    };
    

    const handleDelete = async (id)=>{
        try {
            const response = await fetch(`https://fortexserver.vercel.app/properties/${id}`,{
                method:"DELETE",
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            if(response.ok){
                setProperties(properties.filter((property)=> property._id !== id));
                alert("property deleted")
            }else{
                alert("falied to delete")
            }
        } catch (error) {
            console.error("error deleting property:",error);
        }
    };


    const handleEdit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(
            `https://fortexserver.vercel.app/properties/${selectedProperty._id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify(selectedProperty),
            }
          );
          if (response.ok) {
            const updatedProperty = await response.json();
            setProperties((prev) =>
              prev.map((property) =>
                property._id === updatedProperty._id ? updatedProperty : property
              )
            );
            setEdit(false);
            alert("Property updated successfully");
          } else {
            alert("Failed to update property");
          }
        } catch (error) {
          console.error("Error updating property:", error);
        }
      };

    return(
        <section className="flex flex-col w-95 mx-auto font-pop">
            <div className="w-full h-185 flex flex-col align-center bg-black justify-center my-8 rounded-xl">
                <p className="text-31 leading-36 text-white ml-12">Manage your Properties with Ease!</p>
                <p className="text-18 leading-18 text-white ml-12 mt-1 font-extralight">Here are all your set Properties in one location</p>
            </div>
            <div className="w-full flex justify-between items-center">
                <p className="text-26 leading-26 font-medium text-black ml-6">YourProperties</p>
                <button onClick={() => setAddModal(true)} className="bg-black text-white px-4 py-2 rounded-md">Add Property</button>
            </div>

            <div className="w-full h-content bg-superLgrey rounded-xl my-8 pb-6">
                <div className="w-95 flex justify-between bg-white rounded-xl border-2 border-greyL py-2 px-4 mx-auto my-8">
                    <p className="text-14 font-medium text-black">Property Name</p>
                    <p className="text-14 font-medium text-black">Bedrooms</p>
                    <p className="text-14 font-medium text-black">Bathrooms</p>
                    <p className="text-14 font-medium text-black">Total Size</p>
                    <p className="text-14 font-medium text-black">Tenant Name</p>
                    <p className="text-14 font-medium text-black mr-12">Price/Month</p>
                </div>
                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                {properties.map((property, index) => (
                  <div key={property._id} className="w-95 flex  items-center py-2 px-4 mx-auto my-2 relative">
                    <p className="w-56 text-14 font-normal text-black">
                      {property.location || "N/A"}
                    </p>
                    <p className="w-32 text-14 font-normal text-black">
                      {property.bedrooms || "N/A"}
                    </p>
                    <p className="w-44 text-14 font-normal text-black">
                      {property.bathrooms || "N/A"}
                    </p>
                    <p className="w-44 text-14 font-normal text-black">
                      {property.size || "N/A"} sqft
                    </p>
                    <p className="w-44 text-14 font-normal text-black">
                      {property.tenant || "N/A"}
                    </p>
                    <p className="w-16 text-14 font-normal text-black">
                      {property.price || "N/A"} $
                    </p>
                    <div className="relative">
                      {/* Dropdown Trigger */}
                      <button
                        className="text-black font-bold px-2"
                        onClick={() => toggleDropdown(index)}
                      >
                        ...
                      </button>

                      {/* Dropdown Menu */}
                      {dropdown === index && (
                        <div className="absolute right-0 bg-white shadow-md rounded-md p-2 z-10">
                          <button
                            className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                            onClick={() => {
                                setSelectedProperty(property);
                                setEdit(true);
                                setDropdown(null);
                              }} >
                            Edit
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                            onClick={() => handleDelete(property._id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

            </div>
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/* Edit Modal */}
            {edit && (
              <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-md shadow-lg">
                  <h2 className="text-xl font-bold">Edit Property</h2>
                  <form onSubmit={handleEdit}>
                    <div>
                      <label>Location:</label>
                      <input
                        type="text"
                        value={selectedProperty?.location || ""}
                        onChange={(e) =>
                          setSelectedProperty((prev) => ({
                            ...prev,
                            location: e.target.value,
                          }))
                        }
                        className="block w-full px-4 py-2 mt-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label>Price:</label>
                      <input
                        type="number"
                        value={selectedProperty?.price || ""}
                        onChange={(e) =>
                          setSelectedProperty((prev) => ({
                            ...prev,
                            price: e.target.value,
                          }))
                        }
                        className="block w-full px-4 py-2 mt-2 border rounded-md"
                      />
                    </div>
                    {/* Add more fields for editing as needed */}
                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setEdit(false)}
                        className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/* Add Property Modal */}
            {addModal && (
              <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-md shadow-lg">
                  <h2 className="text-xl font-bold">Add Property</h2>
                  <form onSubmit={handleAddProperty}>
                    <div>
                      <label>Location:</label>
                      <input
                        type="text"
                        value={newProperty.location}
                        onChange={(e) =>
                          setNewProperty((prev) => ({ ...prev, location: e.target.value }))
                        }
                        className="block w-full px-4 py-2 mt-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label>Bedrooms:</label>
                      <input
                        type="number"
                        value={newProperty.bedrooms}
                        onChange={(e) =>
                          setNewProperty((prev) => ({ ...prev, bedrooms: e.target.value }))
                        }
                        className="block w-full px-4 py-2 mt-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label>Bathrooms:</label>
                      <input
                        type="number"
                        value={newProperty.bathrooms}
                        onChange={(e) =>
                          setNewProperty((prev) => ({ ...prev, bathrooms: e.target.value }))
                        }
                        className="block w-full px-4 py-2 mt-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label>Price:</label>
                      <input
                        type="number"
                        value={newProperty.price}
                        onChange={(e) =>
                          setNewProperty((prev) => ({ ...prev, price: e.target.value }))
                        }
                        className="block w-full px-4 py-2 mt-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label>Type:</label>
                      <input
                        type="text"
                        value={newProperty.type}
                        onChange={(e) =>
                          setNewProperty((prev) => ({ ...prev, type: e.target.value }))
                        }
                        className="block w-full px-4 py-2 mt-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label>Size:</label>
                      <input
                        type="number"
                        value={newProperty.size}
                        onChange={(e) =>
                          setNewProperty((prev) => ({ ...prev, size: e.target.value }))
                        }
                        className="block w-full px-4 py-2 mt-2 border rounded-md"
                      />
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setAddModal(false)}
                        className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                      >
                        Add Property
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
        </section>
    )
}

export default DashListings;