import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Sso() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") as string;
  localStorage.setItem("token", token);

  useEffect(() => {
    if (token) {
      // Do something with the token here...
      console.log("successfully loggedin");
      navigate("/dashboard");
    } else {
      console.log("not successfully logged in");
      navigate("/login");
    }
  }, [token, navigate]);

  return <p>Loading now...</p>;
}
