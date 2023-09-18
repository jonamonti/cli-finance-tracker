import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import MonefyLogo from "components/MonefyLogo";
import Form from "./Form";

const LoginPage = () => {
  const { palette } = useTheme();
  const alt = palette.background.alt;
  const isNotMobile = useMediaQuery('(min-width: 1000px');

  return (
    <Box>
      <Box
        width='100%'
        backgroundColor={alt}
        p='1rem 6%'
        textAlign='center'
      >
        <MonefyLogo />
      </Box>

      <Box
        width={isNotMobile ? '60%' : '80%'}
        // maxWidth='800px'
        p='2rem'
        m='2rem auto'
        borderRadius='1.5rem'
        backgroundColor={alt}
      >
        <Typography fontWeight='500' variant='h5' sx={{ mb: '1.5rem' }}>
          Ready to track your expenses easily? Welcome to Monefy!
        </Typography>
        <Form />

      </Box>
    </Box>
  )
}

export default LoginPage



