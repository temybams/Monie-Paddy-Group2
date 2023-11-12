import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/login";
import Signup from "./pages/Signup/signup";
import Sso from "./pages/sso/Sso";
import Homepage from "./pages/homepage/Homepage";
import SendMoney from "./pages/Payment/sendMoney/sendMoney";
import Payment from "./pages/Payment/payment";
import Airtime from "./pages/Payment/Airtime/Airtime";
import Dashboard from "./pages/dashboard/Dashboard";
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
        <Route path="/payments" element={<Payment />} />
        <Route path="/airtime" element={<Airtime />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
