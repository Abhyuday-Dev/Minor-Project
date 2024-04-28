import { Button, Typography } from "@mui/material";
import React from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userState } from "../store/atoms/user";
import { userEmailState } from "../store/selectors/userEmail";
import { userNameState } from "../store/selectors/userName";
import { isUserLoading } from "../store/selectors/isUserLoading";
import { useNavigate } from "react-router-dom";


const AppBar = () => {

  const navigate=useNavigate();
 const userLoading=useRecoilValue(isUserLoading);
 const userEmail=useRecoilValue(userEmailState);
 const userName=useRecoilValue(userNameState);
 const setUser=useSetRecoilState(userState);

 if(userLoading) {
  return <></>
 }

  if (userEmail) {
    console.log(userName);
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem 1.5rem",
          backgroundColor: "#5624d0",
          alignItems: "center",
         
        }}
      >
        <div>
          <Typography variant="h4" color="white" fontWeight="bold">
          Sentimentalyst
          </Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          
          <Typography
            color="white"
            backgroundColor="black"
            fontSize="25px"
            width="40px"
            height="40px"
            padding="0rem 0.3rem"
            textAlign="center"
            borderRadius="50%"
            marginRight="15px"
          >
            {userName[0]}
          </Typography>
          <Button
            style={{
              marginRight: "10px",
              backgroundColor: "white",
              color: "black",
              fontWeight: "bold",
            }}
            size="medium"
            variant="contained"
            onClick={() => {
              localStorage.setItem("token", null);
              setUser({
                isLoading: false,
                userEmail: null
              })
             wind
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem 1.5rem",
          backgroundColor: "#5624d0",
          alignItems: "center",
        }}
      >
        <div>
          <Typography variant="h4" color="white" fontWeight="bold">
          Sentimentalyst
          </Typography>
        </div>
        <div>
          <Button
            style={{
              marginRight: "10px",
              backgroundColor: "white",
              color: "black",
              fontWeight: "bold",
            }}
            size="medium"
            variant="contained"
            onClick={() => {
              window.location = "/signup";
            }}
          >
            Sign up
          </Button>
          <Button
            style={{
              backgroundColor: "black",
              color: "white",
              fontWeight: "bold",
            }}
            size="medium"
            variant="contained"
            onClick={() => {
              window.location = "/login";
            }}
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }
};

export default AppBar;
