import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

// Our Components
import { AuthProvider } from "./utils/auth";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";
import parkApi from "./utils/auth/parkAPI/parkAPI";
import ParkInfo from "./components/ParkInfo";
import Expanded from "./pages/Expanded";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar />
          <Switch>
            <ProtectedRoute exact path="/">
              <Home />
            </ProtectedRoute>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>

            <ProtectedRoute exact path="/Favorites">
              <ParkInfo component="favorites" />
            </ProtectedRoute>
            <ProtectedRoute exact path="/Dashboard">
              <Dashboard component="dashboard" />
            </ProtectedRoute>
            <ProtectedRoute path="/Expanded/:parkId">
              <Expanded />
            </ProtectedRoute>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
