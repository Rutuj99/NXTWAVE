import React, { useState } from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  Box,Spinner
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from '@chakra-ui/react';


export default function Login() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast()

  let Navigate = useNavigate();
 

  let [email, setEmail] = useState("");
  let [pass, setPass] = useState("");

  let [Eemail, EsetEmail] = useState(false);
  let [Epass, EsetPass] = useState(false);
  let  [spin,setSpin]=useState(false);

 function handleRegister(e) {
  e.preventDefault();

  // Reset error states
  EsetEmail(false);
  EsetPass(false);

  // Validate Email
  if (email.length === 0) {
    EsetEmail(true);
    return;
  }

  // Validate Password
  if (pass.length <= 8) {
    EsetPass(true);
    return;
  }

  setSpin(true);  // Show spinner while the request is in progress

  try {
    // Make API call to backend to authenticate and trigger OTP generation
    axios.post(`http://localhost:3000/auth/login`, {
      email: email,
      password: pass,
    })
    .then((res) => {
      localStorage.setItem("profile2", JSON.stringify(res.data.data));
       
      axios.post(`http://localhost:3000/generate-otp`, { email: email })
      .then((otpResponse) => {
       
        localStorage.setItem("profile", JSON.stringify({ email: email }));

        toast({
          title: "OTP Sent!",
          description: "Check your email for the OTP.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        // Navigate to OTP page
        Navigate("/otp");
      })
      .catch((err) => {
        toast({
          title: `${err.response?.data?.message || 'Error generating OTP'}`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
    })
    .catch((err) => {
      toast({
        title: `${err.response?.data?.message || 'Login failed'}`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    });
  } catch (err) {
    toast({
      title: "An error occurred",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  } finally {
    setSpin(false);  // Hide the spinner after the request is complete
  }
}

  

  return (
    
    <div className="Register-Main">
      <div className="Register-One">
        <h1>Login</h1>
      </div>

      <div className="Register-Box">
        <div className="Register-Two">
          <form onSubmit={handleRegister}>
            <h1>Welcome</h1>

            <div className="Register-Input1">
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <EmailIcon color="gray" />
                </InputLeftElement>
                <Input
                  type="email"
                  placeholder="Enter Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </InputGroup>
              {Eemail && (
                <Box color="red" fontSize="small">
                  Email is required.
                </Box>
              )}
            </div>

            <div className="Register-Input1">
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  onChange={(e) => {
                    setPass(e.target.value);
                  }}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {Epass && (
                <Box color="red" fontSize="small">
                  Password should be more than 8 characters.
                </Box>
              )}
            </div>
            <Button type="submit">Next</Button>
            <h3
              className="Register-Bottom"
              onClick={() => {
                Navigate("/");
              }}
            >
              Dont't have an account?Sign Up here
            </h3>
          </form>

          <div className="spinner-one">
          {
            spin && <Spinner
            
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='rgb(134, 216, 208)'
            size='xl'
          />
        }
        </div>
        </div>
      </div>
    </div>
  );
}