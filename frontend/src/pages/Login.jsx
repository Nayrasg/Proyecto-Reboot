import React, { useState } from "react";
//import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Container, TextField, Button, Typography, Box, Grid, FormControlLabel, Checkbox } from '@mui/material';
import CartDrawer from '../components/CartDrawer';




function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  }

  const handlePassword = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = async () => {
    const formData = {
      email, password
    }
    const result = await login(formData);
    if (result.message === 'login succesful') {
      navigate('/signUp');
    } else {
      // Handle login error (e.g., show an error message)
      //console.error('Login failed');
      console.error(result);
    }



    
    //navigate('/editor');
  }

  return (
    <>
    <Navbar />
            <CartDrawer />
            <Container component="main" maxWidth="md" sx={{ marginTop: 12, marginBottom: 14 }}></Container>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        marginTop: 12,
        marginBottom: 12,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>Login</Typography>
      <Box
        sx={{
          width: '300px',
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <TextField
          onChange={handleEmail}
          label="Email"
          variant="outlined"
          fullWidth
        />
        <TextField
          onChange={handlePassword}
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
        />
        <Button onClick={handleSubmit} variant="contained" sx={{ width: '100%' }}>
          Login
        </Button>
      </Box>
    </Box>
     <Footer />
     </>
  );
}

export default Login;
