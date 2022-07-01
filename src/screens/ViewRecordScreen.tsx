import React from 'react'

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Drawer } from "@mui/material";
import RecordPreview from "../components/RecordPreview";
import Container from "@mui/material/Container";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { ArrowBack, Delete, Edit, Save } from '@mui/icons-material';
import { useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function ViewRecordScreen() {

  const  navigate = useNavigate();  
  const {id} = useParams();
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick = {()=>navigate('/')}
        >
          <ArrowBack/>
        </IconButton>
        <Typography
              variant="h6"
              component="div"
              align="center"
              sx={{ flexGrow: 1 }}
            >
             Record Title
            </Typography>

            <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          
        >
          <Edit/>
        </IconButton>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick = {()=>navigate('/')}
        >
          <Delete/>
        </IconButton>
        </Toolbar>

 
        </AppBar>
        </Box>
    <div>ViewRecordScreen</div>
    <div> Record ID is {id}</div>
    </>
  )
}
