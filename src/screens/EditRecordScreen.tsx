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
import { Autocomplete, Card, CircularProgress, Dialog, DialogActions,  DialogTitle, Divider, Stack, TextField } from "@mui/material";
import RecordView from "../components/RecordView";
import Container from "@mui/material/Container";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { ArrowBack, Delete, Edit, Save } from '@mui/icons-material';
import { useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { stringify } from 'querystring';
import Controller from "../controller";
import DiaryEntry from '../model';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function EditRecordScreen() {
    const  navigate = useNavigate();  
    const {id} = useParams();
    let initRecord : Record<string,any> ={};
    initRecord.date = new Date();
    initRecord.project = '';
    initRecord.projectCategory = '';
    initRecord.highlight = '';
    initRecord.title = '';
    initRecord.time = '';
    initRecord.will = '';
    initRecord.health = '';
    initRecord.money = '';
    initRecord.comment = '';

    const [record  ,setRecord ] = React.useState(initRecord);
    React.useEffect(()=>{
       if(id){
      Controller.getController().read(parseInt(id)).then((data)=>{
        if(data){
        let readRecord : Record<string,any>  = data.toObject();
        readRecord.time = readRecord.time.toString();
        
        setRecord(readRecord);
        }
      });}
    },[]);
  
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const deleteRecord = async () =>{
  
       await Controller.getController().delete(DiaryEntry.fromObject(record));
       navigate('/',{ replace: true });
    }
   

    if(!record.id) return (
      <Box  display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh">
        <CircularProgress />
      </Box>
    );
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
          onChange={(date)=>  setRecord({...record, date,})}
          renderInput={(params:any) => <TextField {...params} />}
        />
        </LocalizationProvider>
        
        <TextField 
          id="title" 
          label="Title" 
          value={record.title}
          onChange = {(event)=>setRecord({...record, title : event.target.value})}
        />
        
           <TextField 
            multiline
            maxRows={10}
            
          id="comment"
          label="Comment"
          value={record.comment}
          onChange = {(event)=> setRecord({...record, comment : event.target.value})}
          
        />
        
      
        
     
        <Autocomplete  
          id="highlight"
          options={["new","start","finish"]}
          value={record.hightlight}
          onChange ={(event,value)=>setRecord({...record,highlight : value})}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Highlight" />}
        />
        <TextField 
          id="time"
          label="Time"
          value={record.time}
          onChange = {(event)=> setRecord({...record, time : event.target.value})}
          
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

          record.time = parseFloat(record.time);
          console.log('record time :'+record.time);
          
          Controller.getController().update(DiaryEntry.fromObject(record));
          
          navigate('/',{ replace: true });
        
        
        }}
      >
        <Save/>
      </Fab>
  
      </>
    )
}
