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
import { Card, Dialog, DialogActions,  DialogTitle, Divider, Stack, TextField } from "@mui/material";
import RecordPreview from "../components/RecordPreview";
import Container from "@mui/material/Container";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { ArrowBack, Delete, Edit, Save } from '@mui/icons-material';
import { useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { stringify } from 'querystring';
import Controller from "../controller";
import diaryEntry from '../model';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function EditRecordScreen() {
    const  navigate = useNavigate();  
    const {id} = useParams();
    const [record,setRecord] = React.useState(new diaryEntry());
    React.useEffect(()=>{
      if(id){
      Controller.getController().read(id).then((data)=>{
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
               Diary App
              </Typography>
  
             
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
  
     
   

      
        <Box sx={ {m: 2 } }>
        <Stack spacing={2} >
        <LocalizationProvider dateAdapter={ AdapterDateFns}>
        <MobileDatePicker          
          label="Date"
          inputFormat="dd/MM/yyyy"
          value={record.date }
          onChange={(date)=>  {
            if(date){
                record.date = date;
                setRecord(diaryEntry.fromObject(record.toObject()));
            }
        
        }}
          renderInput={(params:any) => <TextField {...params} />}
        />
        </LocalizationProvider>
        
        <TextField 
          id="title" 
          label="Title" 
          value={record.title}
          onChange = {(event)=>{
            record.title = event.target.value;
            setRecord(diaryEntry.fromObject(record.toObject()));
        
        }}
        />
        
           <TextField 
            multiline
            maxRows={10}
            
          id="comment"
          label="Comment"
          value={record.comment}
          onChange = {(event)=> {
            record.comment = event.target.value;
                
            setRecord(diaryEntry.fromObject(record.toObject()));
            }}
          
        />

        </Stack>
        </Box>

      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
        }}
        onClick = {()=>{

     
          
          Controller.getController().update(record);
          
          navigate('/',{ replace: true });
        
        
        }}
      >
        <Save/>
      </Fab>
  
      </>
    )
}
