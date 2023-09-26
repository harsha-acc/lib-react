import React from 'react'
import NavbarSearch from '../NavbarSearch/NavbarSearch'
import { useEffect, useState } from 'react'
import axios from 'axios'
import OutlinedCard from '../Card/Card'
import './Dashboard.css'
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));



function Dashboard() {
    const [libraries, setLibraries] = useState([])
    const [filteredLibraries, setFilteredLibraries] = useState([])
    const [searchText, setSearchText] = useState("")

    useEffect(() => {
        axios.get('http://localhost:4000/api/v1/library/all')
            .then((response) => {
                setLibraries(response.data)
                if(filteredLibraries.length === 0)
                    setFilteredLibraries(libraries)
            })
            .catch((err) => console.log(err))
    }, [libraries, filteredLibraries.length])

    const handleSearch = () => {
        setFilteredLibraries(libraries
          .filter((library : any) =>
            library.lName.toLowerCase().includes(searchText.toLowerCase())
          ))
    }

    const handleReset = () => {
        setSearchText("")
        setFilteredLibraries(libraries)
    }

  return (
    <>


    <NavbarSearch />
    <br />
    <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
            placeholder="Search Libraries"
            onChange={(e) => setSearchText(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>Search</Button>
        &nbsp;&nbsp;&nbsp;
        <Button variant="contained" onClick={() => { handleReset() }}>Reset</Button>
    </Search>
    {
        filteredLibraries && filteredLibraries.map((library, index) => {
            return(
                <span>
                    <OutlinedCard library={library} />
                </span>
            )
        })
    }
    </>
  )
}

export default Dashboard
