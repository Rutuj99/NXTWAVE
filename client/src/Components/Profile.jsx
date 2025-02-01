import React, { useEffect, useState } from "react";
import { Box, Avatar, Text, VStack, Container, Heading, Button, useDisclosure } from "@chakra-ui/react";
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile2");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  const handleDelete = async () => {
    if (!profile) return;
    try {
      await axios.delete(`http://localhost:3000/delete/${profile._id}`);
      localStorage.removeItem("profile");
      navigate("/login");
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  if (!profile) {
    return <Text>Loading profile...</Text>;
  }

  return (
    <Container centerContent py={10}  style={{backgroundColor:" rgb(197, 202, 202)" , height:"auto",width:"auto",marginTop:"40px"}} >
      <Box
        p={6}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        maxW="sm"
        textAlign="center"
        style={{backgroundColor:" rgb(134, 216, 208)"}}
      >
        <Avatar size="xl" name={profile.firstName} src={profile.profileImage} mb={4} />
        <Heading size="lg">{profile.firstName} {profile.lastName}</Heading>
        <VStack spacing={2} mt={4}>
          <Text fontSize="md" color="gray.600">{profile.email}</Text>
          <Text fontSize="md" color="gray.600">Company: {profile.company}</Text>
          <Text fontSize="md" color="gray.600">DOB: {new Date(profile.dob).toLocaleDateString()}</Text>
        </VStack>
        <Button colorScheme="red" mt={4} onClick={onOpen}>Delete Profile</Button>
      </Box>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Profile
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete your profile? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>Cancel</Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>Delete</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
};

export default ProfilePage;
