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
} from "./Login.style";
import googleLogo from "/google-logo.svg";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Api from "../../api.config";
import { useGoogleLogin } from "@react-oauth/google";

function LoginPage() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
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
      console.log("submitting form");
      console.log(loginData);
      Api.post("/auth/login", loginData)
        .then((res) => {
          const { message } = res.data;
          console.log(message);
          console.log("login successful");
          setLoginData({ email: "", password: "" });
          setSubmit(false);
          navigate("/dashboard");
        })
        .catch((err) => {
          if (err.response) {
            const errorCode = err.response.status;
            console.error(`Problem occured received status: ${errorCode}`);
          } else {
            console.error("Did not receive response");
          }
          console.log("login failed", err.response);
          setLoginData({ email: "", password: "" });
          setSubmit(false);
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
              <SubmitForm type="submit">Sign In</SubmitForm>
            </div>
          </form>
          <div className="d-flex" style={{ gap: "8px" }}>
            <p>Not a member?</p>
            <ExtLink href="/signup">Sign Up</ExtLink>
          </div>
        </SignupSide>
        <FounderSide className="col col-12 col-lg-7">
          <p>Founder message here</p>
        </FounderSide>
      </div>
    </Wrapper>
  );
}

export default LoginPage;
