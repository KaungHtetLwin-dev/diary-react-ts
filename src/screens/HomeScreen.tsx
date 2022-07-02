import React, { useEffect } from "react";
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
import RecordView from "../components/RecordView";
import Container from "@mui/material/Container";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate} from 'react-router-dom';

import Controller from '../controller';
import diaryEntry from "../model";

export default function  HomeScreen () {
  const [drawerState, setdrawerState] = React.useState(false);
  const  navigate = useNavigate();
  let initEntries : Array<diaryEntry> = [];

  const [entries,setEntries] = React.useState(initEntries);
  useEffect(()=> {
     Controller.getController().readAll().then((data) => setEntries(data) )  ;
  })

   

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
                  <ListItemButton
                     onClick={async ()=>{
                      let records = await Controller.getController().readAll();
                      let csvString = records.map((record: { toCSVRow: () => any; }) => record.toCSVRow()).join('');
                      csvString = '"date","title","comment"\n'+csvString;                     
                      var blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
                     
                          var link = document.createElement("a");
                          if (link.download !== undefined) { 
                              var url = URL.createObjectURL(blob);
                              link.setAttribute("href", url);
                              link.setAttribute("download", 'export.csv');
                              link.style.visibility = 'hidden';
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                          
                      }
                      setdrawerState(!drawerState);
                    }}
                    >
                    <ListItemText primary="Export to CSV" />
                  </ListItemButton>
                  <ListItemButton 
                  onClick={async ()=>{
                    await Controller.getController().deleteAll();
                    setdrawerState(!drawerState);
                  }}
                  >
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

      
      
      <Container maxWidth="sm">
        {
          entries.map((entry) => {
            
          
          return (<RecordView entryID={entry.id} key={entry.id} />)})
        }
      </Container>

      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
        }}
        onClick = {() => navigate('/add-record',)}
      >
        <AddIcon />
      </Fab>
    </>
  );
}
