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
} from "./Signup.style";
import googleLogo from "/google-logo.svg";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Api from "../../api.config";
import { useGoogleLogin } from "@react-oauth/google";

function Signup() {
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    fullName: "",
    phoneNumber: "",
    bvn: "",
  });
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

  function googlePassport() {
    if (!submit) {
      setSubmit(true);
      login();
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!submit) {
      setSubmit(true);
      console.log("submitting form");
      console.log(signUpData);
      Api.post("/signup", signUpData)
        .then((res) => {
          const { message } = res.data;
          console.log(message);
          console.log("login successful");
          setSignUpData({
            email: "",
            password: "",
            fullName: "",
            phoneNumber: "",
            bvn: "",
          });
          setSubmit(false);
          navigate("/login");
        })
        .catch((err) => {
          if (err.response) {
            const errorCode = err.response.status;
            console.error(`Problem occured received status: ${errorCode}`);
          } else {
            console.error("Did not receive response");
          }
          console.log("login failed", err.response);
          setSignUpData({
            email: "",
            password: "",
            fullName: "",
            phoneNumber: "",
            bvn: "",
          });
          setSubmit(false);
        });
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
  }

  return (
    <Wrapper>
      <div className="row">
        <SignupSide className="col col-12 col-lg-5">
          <StylishText>Monie Paddy</StylishText>
          <RegisterBox className="my-4">
            <h2 style={{ fontSize: "32px" }}>Sign Up</h2>
            <p style={{ fontSize: "16px" }}>
              Create an account to enjoy our benefits✨
            </p>
          </RegisterBox>
          <GoogleSignin href={`#`} onClick={googlePassport}>
            <GooglesLogo src={googleLogo} alt="google logo" />
            Sign up with Google
          </GoogleSignin>
          <Strikethrough className="my-4">
            <Strike />
            <Or>Or</Or>
            <Strike />
          </Strikethrough>
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <InputHead>
                <Label htmlFor="fullname">Full Name</Label>
              </InputHead>
              <InputField
                id="fullname"
                placeholder="John Doe"
                type="text"
                onChange={handleChange}
                value={signUpData.fullName}
                name="fullName"
                required
              />
            </div>
            <div className="my-3">
              <InputHead>
                <Label htmlFor="email">Email</Label>
              </InputHead>
              <InputField
                id="email"
                placeholder="name@example.com"
                type="email"
                onChange={handleChange}
                value={signUpData.email}
                name="email"
                required
              />
            </div>
            <div className="my-3">
              <InputHead>
                <Label htmlFor="phoneNumber">Phone Number</Label>
              </InputHead>
              <InputField
                id="phoneNumber"
                placeholder="0812345678"
                type="tel"
                onChange={handleChange}
                value={signUpData.phoneNumber}
                name="phoneNumber"
                required
              />
            </div>
            <div className="my-3">
              <InputHead>
                <Label htmlFor="bvn">Bvn</Label>
              </InputHead>
              <InputField
                id="bvn"
                placeholder="22516146577"
                type="number"
                onChange={handleChange}
                value={signUpData.bvn}
                name="bvn"
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
                onChange={handleChange}
                value={signUpData.password}
                name="password"
                required
              />
            </div>
            <div className="mt-5">
              <SubmitForm type="submit">Sign Up</SubmitForm>
            </div>
          </form>
          <div className="d-flex" style={{ gap: "8px" }}>
            <p>Already a member?</p>
            <ExtLink href="/login">Sign In</ExtLink>
          </div>
        </SignupSide>
        <FounderSide className="col col-12 col-lg-7">
          <p>Founder message here</p>
        </FounderSide>
      </div>
    </Wrapper>
  );
}

export default Signup;
