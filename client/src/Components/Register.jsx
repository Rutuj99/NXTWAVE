import React, { useState } from "react";
import axios from "axios";
import {redirect, useNavigate} from "react-router-dom";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  Box,
} from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'
import { EmailIcon } from "@chakra-ui/icons";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Spinner } from '@chakra-ui/react'

export default function Register() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const toast = useToast();
  let Navigate=useNavigate();

  let [fname, setfname] = useState("");
  let [lname, setlname] = useState("");
  let [email, setEmail] = useState("");
  let [location, setLocation] = useState("");
  let [pass, setPass] = useState("");

  let [Efname, Esetfname] = useState(false);
  let [Elname, Esetlname] = useState(false);
  let [Eemail, EsetEmail] = useState(false);
  let [Elocation, EsetLocation] = useState(false);
  let [Epass, EsetPass] = useState(false);
  let [error, setError] = useState(false);
  let [spin,setSpin]=useState(false);

  function handleRegister(e) {
    e.preventDefault();

    Esetfname(false);
    Esetlname(false);
    EsetEmail(false);
    EsetLocation(false);
    EsetPass(false);

    if (fname.length == 0) {
      Esetfname(true);
      return;
    }

    if (lname.length == 0) {
      Esetlname(true);
      return;
    }

    if (email.length == 0) {
      EsetEmail(true);
      return;
    }

    if (location.length == 0) {
      EsetLocation(true);
      return;
    }

    if (pass.length <= 8) {
      EsetPass(true);
      return;
    }
    // using backend-points to store data in mongoDB

    try {
      axios
        .post(`${process.env.REACT_APP_EXPRESS}/auth/register`, {
          firstName: fname,
          lastName: lname,
          email: email,
          location: location,
          password: pass,
        })
        .then((res) => {

          toast({
            title: 'Account created.',
            description: "We've created your account for you.",
            status: 'success',
            duration: 2000,
            isClosable: true,
          })  
             
             setSpin(true);
         
             setTimeout(() => {
              Navigate("/login");
             },2000);
         
        
        }).catch((err)=>{

          
          if (err && err.response && err.response.status === 500) {
    // Server error (HTTP status 500)
    // alert("Something went wrong on the server 500");
      setError(err.response.data)
             toast({
              title: "Email already exists",
              description:"Please login" ,
              status: 'error',
              duration: 2000,
              isClosable: true,
            })
  }else {
    // Network error or other cases
    // alert("Network error or other issue");
    Navigate("/404")
  }

          
           
        })
    } catch (err) {
      setError(err.response.data);
      toast({
        title: "Email already exists",
        description: "Please login",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }

  }

  return (
    <div className="Register-Main">
      <div className="Register-One">
        <h1>SocioMeet</h1>
      </div>

      <div className="Register-Box">
        <div className="Register-Two">
          <form onSubmit={handleRegister}>
            <h1>Welcome to Sociomeet</h1>

            <div className="Register-Input1">
              <div className="Register-Name">
                <Input
                  type="text"
                  placeholder="First Name"
                  variant="filled"
                  onChange={(e) => {
                    setfname(e.target.value);
                  }}
                />

                <Input
                  type="text"
                  placeholder="Last Name"
                  variant="filled"
                  onChange={(e) => {
                    setlname(e.target.value);
                  }}
                />
              </div>

              <div className="Error-Name">
                <div>
                  {Efname && (
                    <Box color="red" fontSize="small">
                      First name is required.
                    </Box>
                  )}
                </div>
                <div>
                  {Elname && (
                    <Box color="red" fontSize="small">
                      Last name is required.
                    </Box>
                  )}
                </div>
              </div>
            </div>

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
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaMapMarkerAlt style={{ color: "grey" }} />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="Enter Location"
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                />
              </InputGroup>
              {Elocation && (
                <Box color="red" fontSize="small">
                  Location is required.
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
            <Button type="submit">Register</Button>

            <h3  className="Register-Bottom" onClick={()=>{
                 Navigate("/login")
            }}>Already have an account?Login here</h3>
           
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