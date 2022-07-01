import React from 'react';

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
import { ArrowBack, Save } from '@mui/icons-material';
import { useNavigate} from 'react-router-dom';

export default function AddRecordScreen() {

    const  navigate = useNavigate();


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
              Add Record
            </Typography>
        </Toolbar>

 
        </AppBar>
        </Box>
        <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "absolute",
          bottom: 32,
          right: 32,
        }}
        onClick = {()=>navigate('/')}
      >
        <Save/>
      </Fab>
        </>
  )
}
