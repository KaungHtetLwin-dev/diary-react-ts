import React from "react";
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
import { useNavigate} from 'react-router-dom';

export default function HomeScreen() {
  const [drawerState, setdrawerState] = React.useState(false);
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
              onClick={() => setdrawerState(!drawerState)}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ backgroundColor: "#0091EA" }}>
              <Drawer
                anchor={"left"}
                open={drawerState}
                onClose={() => setdrawerState(!drawerState)}
                sx={{ width: "16rem" }}
              >
                <List sx={{ width: "16rem", backgroundColor: "#0091EA" ,height:'100%', color:"#ffffff"}}>
                 
                  <ListItemText sx={{height:'20%'}}>
                  Diary App v1
                  </ListItemText>
                  <ListItemButton>
                    <ListItemText primary="Export to CSV" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemText primary="Clear all data" />
                  </ListItemButton>
                </List>
              </Drawer>
            </Box>

            <Typography
              variant="h6"
              component="div"
              align="center"
              sx={{ flexGrow: 1 }}
            >
              Diary App
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <div>HomeScreen</div>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "absolute",
          bottom: 32,
          right: 32,
        }}
        onClick = {() => navigate('/add-record')}
      >
        <AddIcon />
      </Fab>
      <Container maxWidth="sm">
        <RecordPreview />
        <RecordPreview />
        <RecordPreview />
      </Container>
    </>
  );
}
