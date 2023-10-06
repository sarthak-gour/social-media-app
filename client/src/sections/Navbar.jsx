import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, IconButton, InputBase, Typography, Select, MenuItem, FormControl } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { Message, DarkMode, LightMode, Notifications, Menu, Close } from "@mui/icons-material";
import { setMode, setLogout } from 'state/authSlice';
import FlexBw from 'components/FlexBw';



function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const isBigScreen = useMediaQuery("(min-width: 900px)");

  // THEME SETTINGS
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.fName} ${user.lName}`;

  return (
    <FlexBw padding='0.5rem 6%' backgroundColor={alt} position='fixed' width='100%' zIndex='99' top='0'>
      <FlexBw gap='1.75rem' mr='auto'>

        {/* Synergy */}
        <Typography 
          fontWeight='bold' 
          fontSize='clamp(1rem, 2rem, 2.25rem)' 
          color='primary'
          onClick={()=>navigate('/home')}
          sx={{
            "&:hover":{
              color: primaryLight,
              cursor: 'pointer'
            }
          }}
        >
          Synergy
        </Typography>

      </FlexBw>
      
      {/* DESKTOP NAVBAR  */}
      {isBigScreen ? (
        <FlexBw gap='2rem'>
          
          <Message sx={{fontSize:'25px'}} />
          <Notifications sx={{fontSize:'25px'}} />

          {/* Change theme button */}
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'dark' ? (
              <DarkMode sx={{fontSize:'25px'}} />
            ) : (
              <LightMode sx={{color: dark, fontSize:'25px'}} />
            )}
          </IconButton>

          <FormControl variant='standard' value={fullName}>
            <Select 
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: '150px',
                borderRadius: '0.25rem',
                p: '0.25rem 1rem',
                "& .MuiSvgIcon-root":{
                  pr: '0.25rem',
                  width: '3rem'
                },
                "& .MuiSelect-select:focus":{
                  backgroundColor: neutralLight
                }
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>

              <MenuItem onClick={() => dispatch(setLogout())}>
                Log out
              </MenuItem>
            </Select>
          </FormControl>
        </FlexBw>
      ) : (
        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)} >
          <Menu />
        </IconButton>
      )} 

      {/* MOBILE NAV  */}
      {!isBigScreen && isMobileMenuToggled && (
        <Box
          position='fixed'
          right='0'
          bottom='0'
          height='100%'
          zIndex='10'
          maxWidth='500px'
          minWidth='300px'
          backgroundColor={background}
        >
          {/* CLOSE ICON  */}
          <Box display='flex' justifyContent='flex-end' p='1rem'>
            <IconButton onClick={() => setIsMobileMenuToggled(!setIsMobileMenuToggled)}>
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS  */}
          <FlexBw
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            gap='3rem'
          >
            <Message sx={{fontSize:'25px'}} />
            <Notifications sx={{fontSize:'25px'}} />

            <IconButton sx={{fontSize:'25px'}} onClick={() => dispatch(setMode())}>
              {theme.palette.mode === 'dark' ? (
                <DarkMode sx={{fontSize:'25px'}} />
              ) : (
                <LightMode sx={{color: dark, fontSize:'25px'}} />
              )}
            </IconButton>

            <FormControl variant='standard' value={fullName}>
              <Select 
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: '150px',
                  borderRadius: '0.25rem',
                  p: '0.25rem 1rem',
                  "& .MuiSvgIcon-root":{
                    pr: '0.25rem',
                    width: '3rem'
                  },
                  "& .MuiSelect-select:focus":{
                    backgroundColor: neutralLight
                  }
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>

                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBw>

        </Box>
      )}

    </FlexBw>

    )
  };

export default Navbar;