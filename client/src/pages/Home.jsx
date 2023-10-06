import { Box, useMediaQuery } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import Advert from 'sections/Advert';
import AllPostsWidget from 'sections/AllPostsWidget';
import FriendList from 'sections/FriendList';
import MyPostWidget from 'sections/MyPostWidget';
import Navbar from 'sections/Navbar';
import UserWidget from 'sections/UserWidget';

function Home() {
  const isBigScreen = useMediaQuery('(min-width:1000px)');
  const {_id, picturePath} = useSelector((state) => state.user);

  return (
    <Box paddingTop='4rem'>
      <Navbar />

      <Box
        width='100%'
        padding='2rem 6%'
        display={isBigScreen ? 'flex' : 'block'}
        gap='0.5rem'
        justifyContent='space-between'
      >
        {isBigScreen && <Box flexBasis='25%'>
           <Advert /> 
           <Box m="2rem 0" />
           <FriendList userId={_id} />
        </Box>}

        {!isBigScreen && <Box flexBasis='25%'>
          <UserWidget userId={_id} picturePath={picturePath}/>
        </Box>}

        <Box flexBasis={isBigScreen ? '42%' : undefined} mt={isBigScreen ? undefined : '2rem'} >
          <MyPostWidget picturePath={picturePath} />
          <AllPostsWidget userId={_id} />
        </Box>

        {isBigScreen && <Box flexBasis='25%'>
          {/* <UserWidget userId={_id} picturePath={picturePath}/> */}
        </Box>}
        {isBigScreen && <Box position='fixed' right='2.5rem' width='25%'>
          <UserWidget userId={_id} picturePath={picturePath}/>
        </Box>}
        
      </Box>
    </Box>
  )
}

export default Home;