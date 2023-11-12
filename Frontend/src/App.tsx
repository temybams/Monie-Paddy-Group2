import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/login";
import Signup from "./pages/Signup/signup";
import Sso from "./pages/sso/Sso";
import Homepage from "./pages/homepage/Homepage";
import Layout from "./components/shared/dashboard-layout/Layout";
import SendMoney from "./pages/sendMoney/sendMoney";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sso" element={<Sso />} />
        <Route path="/send-money" element={<SendMoney />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
