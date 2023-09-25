import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ReactComponent as SignInImg } from '../../imgs/signup.svg';
import { Stack } from '@mui/system';
import axios from 'axios';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


export default function Signup() {

  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [role, setRole] = React.useState("user")
  const navigate = useNavigate()

  const handleSubmit = () => {
    const url = `http://localhost:4000/api/v1/${role}/signup`
    type userData = {
      uName: String,
      uPassword: String,
      uEmail: String,
    }
    type libraryData = {
      lName: String,
      lPassword: String,
      lEmail: String,
    }
    let newData: (userData & libraryData) = {uName: "", uPassword: "", uEmail: "", lName: "", lPassword: "", lEmail: ""};
    if(role === 'user'){
      newData.uName = name
      newData.uPassword = password
      newData.uEmail = email
    }
    else {
      newData.lName = name
      newData.lPassword = password
      newData.lEmail = email
    }
      axios.post(url, newData).then((response) => {
        console.log(response.data)
        navigate('/login')
      }).catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
    <Navbar />
    <Stack direction='row' className='signup'>
    <div className='signup_form'>
      <Typography variant='h2' color='#1976d2'>Get Started</Typography>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
        {/* <Typography variant='h2' color='#1976d2'>Get Started</Typography> */}
        <TextField
          id="Name" name='name' label="Name" variant="outlined"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <br />
        <TextField
          id="Email" name='email' label="Email" variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <br />
      <TextField
        id="Password" name='password' label="Password" variant="outlined"
        type="password" onChange={(e) => setPassword(e.target.value)}
        value={password}
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
      <br />
      <Button
        variant="contained" className='btn'
        onClick={handleSubmit}
      >
        REGISTER AS {role}
      </Button>
    </Box>
    </div>
    <SignInImg className='signup_img' />
    </Stack>
    </>
  );
}
