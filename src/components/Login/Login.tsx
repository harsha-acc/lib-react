import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Navbar from '../Navbar/Navbar';
import { ReactComponent as LoginImg } from '../../imgs/login.svg';
import { Stack } from '@mui/system';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function Login() {

  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [role, setRole] = React.useState("user")

  const navigate = useNavigate()

  const handleSubmit = () => {
    console.log(email, password)
    axios.post(`http://localhost:4000/api/v1/${role}/login`, {
      email: email,
      password: password
    }).then((response) => {
      console.log(response.data)
      if(role === "user") {
        alert(`Token ${response.data.uToken}`)
        sessionStorage.setItem('uToken', response.data.uToken)
        navigate('/user-dashboard')
      }
      else {
        alert(`Token ${response.data.lToken}`)
        sessionStorage.setItem('lToken', response.data.lToken)
        navigate('/library-dashboard')
      }

    }).catch((err) => {
      alert('Retry')
      console.log(err)
    })
  }

  return (
    <>
    <Navbar />
    <Stack direction="row">
      <div className = "login_form">
      <Typography variant='h2' color='#1976d2'>Welcome Back</Typography>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '50ch' },
        }}
        autoComplete="off"
      >
        <TextField
          id="Email" label="Email" variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <TextField
          id="Password" label="Password" variant="outlined" type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <Box>
          <Typography variant='h5' color='#1976d2'>Select an option</Typography>
          <RadioGroup
            name="role"
            value={role}
            onChange={(e: any) => {console.log(e.target.value); setRole(e.target.value)}}
          >
            <FormControlLabel value="user" control={<Radio />} label="User" defaultChecked/>
            <FormControlLabel value="library" control={<Radio />} label="Library" />
          </RadioGroup>
        </Box>

        <Button
          variant="contained" className='btn'
          onClick={handleSubmit}
        >
          LOGIN as {role}
        </Button>
      </Box>
      </div>
      <LoginImg className="login_img"/>
    </Stack>
    </>
  );
}
