import React, { useState } from "react";
import {
  Container,
  VStack,
  Heading,
  PinInput,
  PinInputField,
  HStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  
  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const storedProfile = JSON.parse(localStorage.getItem("profile"));
      const response = await axios.post("http://localhost:3000/verify-otp", {
        email: storedProfile?.email,
        otp,
      });
      
      toast({
        title: "OTP Verified Successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/home");
    } catch (error) {
      toast({
        title: "Invalid OTP. Please try again!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container centerContent py={10} style={{backgroundColor:" rgb(202, 228, 228)" , height:"auto",width:"auto",marginTop:"40px",border:"2px solid rgb(102, 250, 250)",borderRadius:"5px"}}>
      <VStack spacing={5}>
        <Heading size="lg">Enter OTP</Heading>
        <HStack>
          <PinInput otp onChange={(value) => setOtp(value)}>
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
        <Button
          colorScheme="blue"
          onClick={handleVerifyOtp}
          isLoading={loading}
          isDisabled={otp.length !== 6}
        >
          Verify OTP
        </Button>
      </VStack>
    </Container>
  );
};

export default OtpPage;
