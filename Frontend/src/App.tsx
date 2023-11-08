import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/login";
import Signup from "./pages/Signup/signup";
import Sso from "./pages/sso/Sso";
import Homepage from "./pages/homepage/Homepage";
import Layout from "./components/shared/dashboard-layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Layout />} />
        <Route path="/sso" element={<Sso />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
