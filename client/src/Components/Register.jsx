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
import { FaBriefcase } from "react-icons/fa";
import { Spinner } from '@chakra-ui/react'
import { MdDateRange } from "react-icons/md";
import { FaFile } from "react-icons/fa";


import { createClient } from "@supabase/supabase-js";




const supabase = createClient(supabaseUrl, anon_key);

export default function Register() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const toast = useToast();
  let Navigate=useNavigate();

  let [fname, setfname] = useState("");
  let [lname, setlname] = useState("");
  let [email, setEmail] = useState("");
  let [company, setCompany] = useState("");
  let [dob, setDob] = useState("");
  let [profileImage, setImage] = useState("");
  let [pass, setPass] = useState("");

  

  let [Efname, Esetfname] = useState(false);
  let [Elname, Esetlname] = useState(false);
  let [Eemail, EsetEmail] = useState(false);
  let [ ECompany, EsetCompany] = useState(false);
  let [Epass, EsetPass] = useState(false);
  let [error, setError] = useState(false);
  let [spin,setSpin]=useState(false);
  let [fdob, fsetDob] = useState(false);
  let [fprofileImage, fsetImage] = useState(false);



  // SUPABASE INTEGRATION 


  const handleImageUpload = (e) => {
  
    if (e.target.files && e.target.files[0]) {
      // console.log("first",e.target.files )
      // console.log(e.target.files[0] )
      // setSelectedFile(URL.createObjectURL(e.target.files[0]));
      // console.log(URL.createObjectURL(e.target.files[0]) )
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = async (file) => {
    let fileName = `${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("Filex")
      .upload(fileName, file);

    const urlInfo = supabase.storage.from("Filex").getPublicUrl(data.path);

    console.log("uploaded data", urlInfo.data.publicUrl);
    setImage(urlInfo.data.publicUrl);
  };


  function handleRegister(e) {
    e.preventDefault();

    Esetfname(false);
    Esetlname(false);
    EsetEmail(false);
    EsetCompany(false);
    EsetPass(false);
    fsetImage(false);
    fsetDob(false);

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

    if (company.length == 0) {
      EsetCompany(true);
      return;
    }

    if(!dob.length){
      fsetDob(true);
      return;
    }

    console.log(profileImage,"wergngbfvc")

    if (profileImage.length == 0) {
      fsetImage(true);
      return;
    }


    if (pass.length <= 8) {
      EsetPass(true);
      return;
    }
    // using backend-points to store data in mongoDB




    try {
      axios
        .post(`http://localhost:3000/auth/register`, {
          firstName: fname,
          lastName: lname,
          email: email,
          company: company,
          dob:dob,
          profileImage:profileImage,
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
        <h1>Register</h1>
      </div>

      <div className="Register-Box">
        <div className="Register-Two">
          <form onSubmit={handleRegister}>
            <h1>Welcome</h1>

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
                  <FaBriefcase style={{ color: "grey" }} />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="Enter company"
                  onChange={(e) => {
                    setCompany(e.target.value);
                  }}
                />
              </InputGroup>
              { ECompany && (
                <Box color="red" fontSize="small">
                  Company is required.
                </Box>
              )}
            </div>


               


            <div className="Register-Input1">
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <MdDateRange style={{ color: "grey" }} />
                </InputLeftElement>
                <Input
                  type="date"
                  placeholder="Enter company"
                  style={{alignContent:"center", color: "grey" }}
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                />
              </InputGroup>

              { fdob && (
                <Box color="red" fontSize="small">
                  DOB is required.
                </Box>
              )}
            </div>

            <div className="Register-Input1">
              <InputGroup>
              <InputLeftElement pointerEvents="none">
                  <FaFile style={{ color: "grey" }} />
                </InputLeftElement>
                <Input
                  type="file"
                  style={{alignContent:"center", color: "grey" }}
                
                  onChange={handleImageUpload}
                />
              </InputGroup>
              { fprofileImage && (
                <Box color="red" fontSize="small">
                  Image is required.
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










// firstName: data.firstName,
// lastName: data.lastName,
// email: data.email,
// company: data.company,
// dob:data.dob,
// profileImage:data.profileImage,
// password: hash