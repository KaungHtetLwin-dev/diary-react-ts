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
import { Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Drawer, Stack } from "@mui/material";
import RecordView from "../components/RecordView";
import Container from "@mui/material/Container";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { ArrowBack, Delete, Edit, Save } from '@mui/icons-material';
import { useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { stringify } from 'querystring';
import Controller from "../controller";
import diaryEntry from '../model';

export default function ViewRecordScreen() {

  const  navigate = useNavigate();  
  const {id} = useParams();
  const [record,setRecord] = React.useState(new diaryEntry());
  React.useEffect(()=>{
    if(id){
    Controller.getController().read(parseInt(id)).then((data)=>{
      if(data)
      setRecord(data);
    });}
  },[]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteRecord = () =>{

     Controller.getController().delete(record);
     navigate('/',{ replace: true });
  }

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
          onClick = {handleClickOpen}
        >
          <Delete/>
        </IconButton>
        </Toolbar>

 
        </AppBar>
        </Box>

        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete?"}
        </DialogTitle>
   
        <DialogActions>
          <Button onClick={deleteRecord}>Yes</Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>

   
    <Card sx={{m:2,p:2}}>
      <Stack >
    <Typography sx={{m:2}}>
    {record.date.getDate()+'.'+(record.date.getMonth()+1)+'.'+record.date.getFullYear()}
    </Typography >
    <Divider/>
    <Typography sx={{m:2}}>
      {record.title}
    </Typography>
    <Divider/>
    <Typography sx={{m:2}}>
      {record.comment}
    </Typography>
    </Stack>
    </Card>

    </>
  )
}
