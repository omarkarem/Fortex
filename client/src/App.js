import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Properties from "./Pages/Properties";
import Dashboard from "./Pages/Dashboard";
import RenterProfile from "./Components/RenterProfile";
import ProtectedRoute from "./Components/ProtectedRoutes";
import PropertyPage from "./Components/PropertyPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route path="/signup" Component={Signup} />
        <Route path="/login" Component={Login} />
        <Route path="/properties" element={<ProtectedRoute requiredType="Renter"><Properties /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute requiredType="Owner"><Dashboard /></ProtectedRoute>} />
        <Route path="/renter/dashboard" element={<ProtectedRoute requiredType="Renter"><RenterProfile/></ProtectedRoute>} />
        <Route path="/property" Component={PropertyPage}/>
      </Routes>
    </Router>
  );
}

export default App;
