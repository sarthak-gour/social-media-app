import { ManageAccountsOutlined, EditOutlined, LocationOnOutlined, WorkOutlineOutlined } from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBw from "components/FlexBw";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({userId, picturePath}) => {
    const [user, setUser] = useState(null);
    const {palette} = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const getUser = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`, {
            method: 'GET',
            headers: {Authorization: `Bearer ${token}`}
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []); 

    if(!user){
        return null;
    }

    const{fName, lName, location, profession, friends} = user;

    return (
        <WidgetWrapper>
            <FlexBw
                gap='0.5rem'
                pb='1.1rem'
                onClick={() => navigate(`/profile/${userId}`) }
            >
                <FlexBw gap='1rem'>
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                            variant='h4'
                            color={dark}
                            fontWeight='500'
                            sx={{
                                '&:hover':{
                                    color: palette.primary.light,
                                    cursor: 'pointer'
                                }
                            }}
                        >
                            {fName} {lName}
                        </Typography>
                        <Typography color={medium}>
                            {friends.length} connections
                        </Typography>
                    </Box>
                </FlexBw>
                <ManageAccountsOutlined />
            </FlexBw>
                
            <Divider />
                
            <Box p='1rem 0'>
                <Box display='flex' alignItems='center' gap='1rem' mb='0.5rem'>
                    <LocationOnOutlined fontSize='large' sx={{color: main}} />
                    <Typography color={medium}>
                        {location}
                    </Typography>
                </Box>
                <Box display='flex' alignItems='center' gap='1rem' mb='0.5rem'>
                    <WorkOutlineOutlined fontSize='large' sx={{color: main}} />
                    <Typography color={medium}>
                        {profession}
                    </Typography>
                </Box>
            </Box>

            <Divider />

            <Box p='1rem 0'>
                <Typography 
                    fontSize='1rem' 
                    color={main} 
                    fontWeight='500'
                    mb='1rem'
                >
                    Social Profiles
                </Typography>

                <FlexBw gap='1rem' mb='0.5rem'>
                    <FlexBw gap='1rem'>
                        <img src='../assets/twitter.png' alt='twitter'/>
                        <Box>
                            <Typography color={main} fontWeight='500'>
                                Twitter
                            </Typography>
                            <Typography color={medium}>
                                Social Network
                            </Typography>
                        </Box>
                    </FlexBw>
                    <EditOutlined sx={{color:main}} />
                </FlexBw>

                <FlexBw gap='1rem'>
                    <FlexBw gap='1rem'>
                        <img src='../assets/linkedin.png' alt='linkedin'/>
                        <Box>
                            <Typography color={main} fontWeight='500'>
                                LinkedIn
                            </Typography>
                            <Typography color={medium}>
                                Network Platform
                            </Typography>
                        </Box>
                    </FlexBw>
                    <EditOutlined sx={{color:main}} />
                </FlexBw>
            </Box>

        </WidgetWrapper>
    );
};

export default UserWidget;