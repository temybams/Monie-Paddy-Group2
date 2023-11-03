import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "./components/shared/layout";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/login";
import Signup from "./pages/Signup/signup";
import Dashboard from "./pages/fakedashboard/Dashboard";
import Sso from "./pages/sso/Sso";
import Homepage from "./pages/homepage/Homepage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sso" element={<Sso />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
