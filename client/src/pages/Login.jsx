import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "sections/Form";


function Login() {
  const theme = useTheme();
  const isBigScreen = useMediaQuery('(min-width: 900px)');
  return (
    <Box>
      <Box
        width='100%'
        backgroundColor={theme.palette.background.alt}
        p='1rem 6%'
        textAlign='center'
      >
        <Typography fontWeight='bold' fontSize='40px' color='primary'>
          Synergy
        </Typography>
      </Box>

      <Box
        width={isBigScreen ? '50%' : '90%'}
        p='2rem'
        m='2rem auto'
        borderRadius='1rem'
        textAlign='center'
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight='500' variant='h5' mb='1.5rem'>
          Welcome to Synergy - the social media app to connect, share and explore!
        </Typography>

        <Form />

      </Box>

    </Box>
  )
};

export default Login;