import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state/authSlice";

const FriendList = ({ userId }) => {
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    const getFriends = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}/friends`,{
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        dispatch(setFriends({ friends: data }));
    };

    useEffect(() => {
        getFriends();
    }, []); 

    return (
        <WidgetWrapper>
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
            >
                Connections
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {friends.map((friend) => (
                <Friend
                    key={friend._id}
                    friendId={friend._id}
                    name={`${friend.fName} ${friend.lName}`}
                    subtitle={friend.profession}
                    userPicturePath={friend.picturePath}
                />
                ))}
            </Box>
        </WidgetWrapper>
    );
};

export default FriendList;
