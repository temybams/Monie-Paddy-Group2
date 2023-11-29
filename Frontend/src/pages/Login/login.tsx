import {
  Wrapper,
  SignupSide,
  FounderSide,
  StylishText,
  RegisterBox,
  GoogleSignin,
  GooglesLogo,
  Strikethrough,
  Strike,
  Or,
  InputHead,
  InputField,
  Label,
  SubmitForm,
  ExtLink,
  StyledImage,
  Text,
} from "./Login.style";
import googleLogo from "/google-logo.svg";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Rectangleii from "/Rectangle.jpg";
import axios from "axios";
import Api from "../../api.config";
import { useGoogleLogin } from "@react-oauth/google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function LoginPage() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: (codeResponse: { access_token: string }) => {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          Api.post(`/auth/google/redirect`, res.data)
            .then((response) => {
              const { message } = response.data;

              navigate("/dashboard");
              console.log(message);
              setSubmit(false);
            })
            .catch((err) => {
              if (err.response) {
                const errorCode = err.response.status;
                console.log(`auth failed with status code: ${errorCode}`);
              } else {
                console.log(err);
              }
              setSubmit(false);
            });
        });
    },
    onError: (error) => {
      console.log("Failed to get token using the Google OAuth flow.", error);
      //navigate('/')
      setSubmit(false);
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!submit) {
      setSubmit(true);
      setBtnDisabled(true);
      console.log("submitting form");
      console.log(loginData);
      Api.post("/auth/login", loginData)
        .then((res) => {
          const { message } = res.data;
          console.log(message);
          console.log("login successful");
          toast.success("Login successful!", {
            position: "top-right",
            autoClose: 5000,
          });
          setLoginData({ email: "", password: "" });
          setSubmit(false);
          setBtnDisabled(false);
          setTimeout(() => {
            navigate("/dashboard");
          }, 3000);
        })
        .catch((err) => {
          if (err.response) {
            const errorCode = err.response.status;
            console.error(`Problem occured received status: ${errorCode}`);
            toast.error(`Login failed. Status: ${errorCode}`, {
              position: "top-right",
              autoClose: 5000,
            });
          } else {
            console.error("Did not receive response");
            toast.error("Login failed. Please try again later.", {
              position: "top-right",
              autoClose: 5000,
            });
          }
          console.log("login failed", err.response);
          setLoginData({ email: "", password: "" });
          setSubmit(false);
          setBtnDisabled(true);
        });
    }
  }

  function googlePassport() {
    if (!submit) {
      setSubmit(true);
      login();
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  }

  useEffect(() => {
    // Check if all required fields are filled
    const isFormComplete = loginData.email && loginData.password;

    // Update the disabled state of the button
    setBtnDisabled(!isFormComplete);
  }, [loginData]);

  return (
    <Wrapper>
      <div className="row">
        <SignupSide className="col col-12 col-lg-5">
          <StylishText>Monie Paddy</StylishText>
          <RegisterBox className="my-4">
            <h2 style={{ fontSize: "32px" }}>Log In</h2>
            <p style={{ fontSize: "16px" }}>
              Enter your details to access your account
            </p>
          </RegisterBox>
          <GoogleSignin href={`#`} onClick={googlePassport}>
            <GooglesLogo src={googleLogo} alt="google logo" />
            Sign in with Google
          </GoogleSignin>
          <Strikethrough className="my-4">
            <Strike />
            <Or>Or</Or>
            <Strike />
          </Strikethrough>
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <InputHead>
                <Label htmlFor="email">Email</Label>
              </InputHead>
              <InputField
                id="email"
                placeholder="name@example.com"
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="my-3">
              <InputHead>
                <Label htmlFor="password">Password</Label>
              </InputHead>
              <InputField
                id="password"
                placeholder="Password123@"
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-5">
              <SubmitForm type="submit" disabled={btnDisabled}>
                Sign In
              </SubmitForm>
            </div>
          </form>
          <div className="d-flex" style={{ gap: "8px" }}>
            <p>Not a member?</p>
            <ExtLink href="/signup">Sign Up</ExtLink>
          </div>
        </SignupSide>
        <FounderSide className="col col-12 col-lg-7">
          <Text>
            It takes 20 years to build a reputation and five minutes to ruin it.
            If you think about that, you’ll do things differently.
          </Text>
          <strong className="py-7 px-4"> - Boluwatife</strong>
          <p className="p-4"> Founder, Pay-buddy</p>
          <StyledImage src={Rectangleii} alt="Description" />
        </FounderSide>
      </div>
      <ToastContainer />
    </Wrapper>
  );
}

export default LoginPage;


