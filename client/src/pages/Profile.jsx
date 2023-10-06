import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "sections/Navbar";
import FriendList from "sections/FriendList";
import MyPostWidget from "sections/MyPostWidget";
import AllPostsWidget from "sections/AllPostsWidget";
import UserWidget from "sections/UserWidget";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isBigScreen = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return null;

  return (
    <Box paddingTop='4rem'>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isBigScreen ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isBigScreen ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendList userId={userId} />
        </Box>
        <Box
          flexBasis={isBigScreen ? "42%" : undefined}
          mt={isBigScreen ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <AllPostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
