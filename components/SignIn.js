import React from "react";
import styled from "styled-components";
import fire from "../config/fire-conf";

export const StyledButton = styled.button`
  height: 35px;
  width: fit-content;
  padding: 2px 20px;
  margin-left: 20px;
  margin-right: 15px;
  border: 2px solid #967e76;
  color: #eee3cb;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  font-family: "Calibri";
  position: relative;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  -webkit-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
  background: #343434 !important;
  z-index: 10;

  ::before {
    content: "";
    position: absolute;
    bottom: 50%;
    left: 0px;
    width: 100%;
    height: 1px;
    background: blue;
    display: block;
    -webkit-transform-origin: left top;
    -ms-transform-origin: left top;
    transform-origin: left top;
    -webkit-transform: scale(0, 1);
    -ms-transform: scale(0, 1);
    transform: scale(0, 1);
    -webkit-transition: transform 0.4s cubic-bezier(1, 0, 0, 1);
    transition: transform 0.4s cubic-bezier(1, 0, 0, 1);
  }
  :hover::before {
    -webkit-transform-origin: right top;
    -ms-transform-origin: right top;
    transform-origin: right top;
    -webkit-transform: scale(1, 1);
    -ms-transform: scale(1, 1);
    transform: scale(1, 1);
  }
  :hover {
    border: 2px solid #343434;
    color: #343434 !important;
  }
  :before {
    content: "";
    width: 0%;
    height: 100%;
    display: block;
    background: #d7c0ae;
    position: absolute;
    -ms-transform: skewX(-20deg);
    -webkit-transform: skewX(-20deg);
    transform: skewX(-20deg);
    left: -10%;
    opacity: 1;
    top: 0;
    z-index: -12;
    -moz-transition: all 0.7s cubic-bezier(0.77, 0, 0.175, 1);
    -o-transition: all 0.7s cubic-bezier(0.77, 0, 0.175, 1);
    -webkit-transition: all 0.7s cubic-bezier(0.77, 0, 0.175, 1);
    transition: all 0.7s cubic-bezier(0.77, 0, 0.175, 1);
    box-shadow: 2px 0px 15px rgba(0, 0, 0, 0.6);
  }
  ::after {
    content: "";
    width: 0%;
    height: 100%;
    display: block;
    background: #967e76;
    position: absolute;
    -ms-transform: skewX(-20deg);
    -webkit-transform: skewX(-20deg);
    transform: skewX(-20deg);
    left: -10%;
    opacity: 0;
    top: 0;
    z-index: -15;
    -moz-transition: all 0.95s cubic-bezier(0.2, 0.95, 0.57, 0.99);
    -o-transition: all 0.4s cubic-bezier(0.2, 0.95, 0.57, 0.99);
    -webkit-transition: all 0.4s cubic-bezier(0.2, 0.95, 0.57, 0.99);
    transition: all 0.4s cubic-bezier(0.2, 0.95, 0.57, 0.99);
    box-shadow: 2px 0px 15px rgba(0, 0, 0, 0.6);
  }
  :hover::before {
    opacity: 1;
    width: 116%;
  }
  :hover::after {
    opacity: 1;
    width: 120%;
  }
`;

function SignIn(props) {
  const { signInStatus, setSignInStatus, setUserData } = props;

  const signIn = () => {
    let googleProvider = new fire.auth.GoogleAuthProvider();
    fire
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        setSignInStatus(true);
        setUserData(res);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signOut = () => {
    setSignInStatus(false);
    fire
      .auth()
      .signOut()
      .then((res) => {
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (signInStatus === false) {
    return <StyledButton onClick={signIn}>Sign In With Google</StyledButton>;
  } else {
    return <StyledButton onClick={signOut}>Sign Out</StyledButton>;
  }
}

export default SignIn;
