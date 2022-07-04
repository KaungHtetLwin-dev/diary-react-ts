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
import { Drawer, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import RecordView from "../components/RecordView";
import Container from "@mui/material/Container";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { ArrowBack, ConstructionOutlined, ContactlessOutlined, Save } from '@mui/icons-material';
import { useNavigate} from 'react-router-dom';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import DiaryRecord from '../model';
import Autocomplete from '@mui/material/Autocomplete';
import { parse } from 'path';
import Controller from '../controller';

export default function AddRecordScreen() {

    const  navigate = useNavigate();
    
    let initRecord : Record<string,any> ={};
    initRecord.date = new Date();
    initRecord.project = '';
    initRecord.projectCategory = '';
    initRecord.highlight = '';
    initRecord.tilte = '';
    initRecord.time = '';
    initRecord.will = '';
    initRecord.health = '';
    initRecord.money = '';
    initRecord.comment = '';
    const [record,setRecord] = React.useState (initRecord);
    
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
        
      
        <Stack direction="row" spacing={2}>
  

     
        {/* <Autocomplete  
          id="highlight"
          options={["new","star","fin"]}
          value={record.hightlight}
          onChange ={(event,value)=>setRecord({...record,highlight : value})}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Highlight" />}
        /> */}
        <FormControl sx = {{width:'50%'}}>
         <InputLabel id="highlight-label">Highlight</InputLabel>
          <Select
            
            labelId="highlight-label"
            label="Highlight"
            value={record.highlight}
            
            
            onChange={(event)=>{
              
              setRecord({...record, highlight : event.target.value})
            }}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="new">new</MenuItem>
            <MenuItem value= "star">star</MenuItem>
            <MenuItem value= "fin">fin</MenuItem>
          </Select>
          </FormControl>
        <TextField 
        sx = {{width:'50%'}}
          id="time"
          label="Time"
          value={record.time}
          onChange = {(event)=> setRecord({...record, time : event.target.value})}
          
        />
        </Stack>
    
        

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
          
          
          Controller.getController().create(DiaryRecord.fromObject(record));
          
          navigate('/',{ replace: true });
        
        
        }}
      >
        <Save/>
      </Fab>
        </>
  )
}
