import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail]  =useState('')
  const [password, setPassword]  =useState('')

  const navigate = useNavigate()

  const handleEmail = (event) => {
    setEmail(event.target.value)
  }
  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async () => {
    const formData = {
      email, password
    }

    const result = await login(formData)
    navigate('/profile')
  }


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <h1 style={{ width: "100px", textAlign: "center" }}>Login</h1>

      <Box
        sx={{
          width: '300px', // Ajusta el ancho según sea necesario
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2, // Añade un espaciado entre los elementos
        }}
      >
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <label style={{ width: '100%' }}>
            <TextField
              onChange={handleEmail}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth
            />
          </label>
          <label style={{ width: '100%' }}>
            <TextField
              onChange={handlePassword}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
            />
          </label>
        </Box>
        <Button onClick={handleSubmit} variant="contained" sx={{ width: '100%' }}>
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default Login;